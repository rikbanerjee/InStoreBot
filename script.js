// Global variables
let isRecording = false;
let recognition = null;
let customerPoints = 0;
let customerLevel = "New Shopper";
let funMode = false;
let emojiResponses = true;
let lastInteractionTime = Date.now();
let selectedShareType = 'achievement';
let currentShareData = {};



// Sample product database
const products = [
    {
        id: 1,
        name: "Gillette Fusion ProGlide Razor",
        category: "Personal Care",
        price: 2.99,
        aisle: "1",
        shelf: "3",
        stock: 45,
        description: "Gillette Fusion ProGlide Razor is a razor that provides a close shave with a 5-blade system.",
        image: "🪒",
        tags: ["razor", "shave", "close shave", "5-blade"]
    },
    {
        id: 2,
        name: "Popcorn",
        category: "Snacks",
        price: 3.49,
        aisle: "2",
        shelf: "1",
        stock: 12,
        description: "Freshly popped popcorn. Great for movie nights or snacking.",
        image: "🍿",
        tags: ["popcorn", "snack", "movie night", "healthy"]
    },
    {
        id: 3,
        name: "Coca-Cola",
        category: "Beverages",
        price: 4.99,
        aisle: "3",
        shelf: "2",
        stock: 23,
        description: "Coca-Cola is a carbonated soft drink. It is a type of cola.",
        image: "🥤",
        tags: ["cola", "soda", "carbonated", "sweet"]
    },
    {
        id: 4,
        name: "Revlon Colorstay Foundation",
        category: "Beauty",
        price: 8.99,
        aisle: "4",
        shelf: "1",
        stock: 15,
        description: "Revlon Colorstay Foundation is a long-wearing foundation that provides medium to full coverage with a matte finish.",
        image: "💄",
        tags: ["foundation", "matte", "long-wearing", "medium-full coverage"]
    },
    {
        id: 5,
        name: "Tylenol",
        category: "Pharmacy",
        price: 6.49,
        aisle: "5",
        shelf: "2",
        stock: 8,
        description: "Tylenol is a pain reliever and fever reducer. It is used to relieve pain from headaches, muscle aches, and menstrual periods.",
        image: "💊",
        tags: ["pain reliever", "fever reducer", "headache", "muscle ache", "menstrual period"]
    }
];

// Hot Deals Database - Curated Beauty Items
const hotDeals = [
    {
        id: "deal1",
        name: "Maybelline Sky High Mascara",
        category: "Beauty",
        originalPrice: 12.99,
        discountedPrice: 8.99,
        discount: 31,
        aisle: "4",
        shelf: "2",
        stock: 25,
        description: "Volumizing and lengthening mascara that gives you sky-high lashes. Waterproof formula lasts all day.",
        image: "👁️",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center&auto=format",
        features: ["Volumizing", "Waterproof", "Long-lasting"],
        tags: ["mascara", "volumizing", "waterproof", "lengthening"],
        dealEnds: "2024-02-15"
    },
    {
        id: "deal2",
        name: "Neutrogena Ultra Sheer Sunscreen",
        category: "Beauty",
        originalPrice: 15.99,
        discountedPrice: 10.99,
        discount: 31,
        aisle: "4",
        shelf: "3",
        stock: 18,
        description: "Broad spectrum SPF 50+ sunscreen with lightweight, non-greasy formula. Perfect for daily use.",
        image: "☀️",
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center&auto=format",
        features: ["SPF 50+", "Non-greasy", "Broad spectrum"],
        tags: ["sunscreen", "spf", "protection", "lightweight"],
        dealEnds: "2024-02-20"
    },
    {
        id: "deal3",
        name: "L'Oreal Paris True Match Foundation",
        category: "Beauty",
        originalPrice: 14.99,
        discountedPrice: 9.99,
        discount: 33,
        aisle: "4",
        shelf: "1",
        stock: 12,
        description: "Buildable coverage foundation that matches your skin tone perfectly. Natural finish for everyday wear.",
        image: "🎨",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
        features: ["Buildable", "Natural finish", "True match"],
        tags: ["foundation", "buildable", "natural", "everyday"],
        dealEnds: "2024-02-18"
    },
    {
        id: "deal4",
        name: "CeraVe Moisturizing Cream",
        category: "Beauty",
        originalPrice: 19.99,
        discountedPrice: 13.99,
        discount: 30,
        aisle: "4",
        shelf: "4",
        stock: 30,
        description: "Hydrating face and body moisturizer with ceramides and hyaluronic acid. Suitable for all skin types.",
        image: "🧴",
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
        features: ["Hydrating", "Ceramides", "All skin types"],
        tags: ["moisturizer", "hydrating", "ceramides", "sensitive"],
        dealEnds: "2024-02-25"
    },
    {
        id: "deal5",
        name: "NYX Professional Makeup Lip Lingerie",
        category: "Beauty",
        originalPrice: 8.99,
        discountedPrice: 5.99,
        discount: 33,
        aisle: "4",
        shelf: "5",
        stock: 22,
        description: "Matte liquid lipstick with long-lasting color. Comfortable formula that doesn't dry out your lips.",
        image: "💋",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
        features: ["Matte finish", "Long-lasting", "Comfortable"],
        tags: ["lipstick", "matte", "long-lasting", "liquid"],
        dealEnds: "2024-02-22"
    },
    {
        id: "deal6",
        name: "The Ordinary Niacinamide 10%",
        category: "Beauty",
        originalPrice: 11.99,
        discountedPrice: 7.99,
        discount: 33,
        aisle: "4",
        shelf: "6",
        stock: 15,
        description: "High-strength vitamin and mineral blemish formula. Reduces blemishes and balances sebum activity.",
        image: "✨",
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
        features: ["Blemish control", "Sebum balance", "Vitamin B3"],
        tags: ["serum", "niacinamide", "blemish", "skincare"],
        dealEnds: "2024-02-28"
    }
];

// Store layout for navigation
const storeLayout = {
    "A1": { name: "Personal Care Section", description: "Razors, shaving cream, and other personal care products", direction: "Enter the store and turn right" },
    "A2": { name: "Snacks Section", description: "Popcorn, chips, and other snacks", direction: "Continue past produce, on your left" },
    "A3": { name: "Beverages Section", description: "Coca-Cola, water, and other beverages", direction: "Turn left after bakery, straight ahead" },
    "A4": { name: "Beauty Section", description: "Foundation, lipstick, and other beauty products", direction: "Continue past dairy, on your right" },
    "A5": { name: "Pharmacy Section", description: "Tylenol, ibuprofen, and other pain relievers", direction: "Turn right after beauty section" }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeVoiceRecognition();
    setupEventListeners();
    displayHotDeals();
    setupImageHandling();
    loadCustomerProgress();
    updateCustomerDisplay();
    
    // Show personalized welcome if returning customer
    setTimeout(() => {
        if (customerPoints > 0) {
            addMessage(`🎉 Welcome back, ${customerLevel}! You have ${customerPoints} points. Keep shopping to earn more rewards!`, 'bot', 'fun-message');
        }
    }, 2000);
});

// Setup image handling
function setupImageHandling() {
    // Add loading and error handling for all product images
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.product-real-image');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
            img.addEventListener('error', function() {
                this.style.display = 'none';
                const fallback = this.nextElementSibling;
                if (fallback && fallback.classList.contains('product-image-fallback')) {
                    fallback.style.display = 'flex';
                }
            });
        });
    });
}

// Gamification Functions
function addPoints(points, reason) {
    customerPoints += points;
    updateCustomerDisplay();
    saveCustomerProgress();
    
    // Show points earned notification
    showPointsEarned(points, reason);
    
    // Check for level up
    checkLevelUp();
}

function showPointsEarned(points, reason) {
    const notification = document.createElement('div');
    notification.className = 'points-earned';
    notification.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
            <div>+${points} Points!</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${reason}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Create confetti effect
    createConfetti();
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function checkLevelUp() {
    const newLevel = getLevelFromPoints(customerPoints);
    if (newLevel !== customerLevel) {
        customerLevel = newLevel;
        updateCustomerDisplay();
        showLevelUpMessage();
    }
}

function getLevelFromPoints(points) {
    if (points >= 1000) return "Shopping Master";
    if (points >= 500) return "Deal Hunter";
    if (points >= 200) return "Smart Shopper";
    if (points >= 50) return "Regular Customer";
    return "New Shopper";
}

function showLevelUpMessage() {
    const message = `🎊 **LEVEL UP!** 🎊\n\nCongratulations! You're now a **${customerLevel}**!\n\nKeep shopping to earn more points and unlock exclusive deals!`;
    addMessage(message, 'bot');
    addMessage('fun-message');
    
    // Auto-share achievement
    setTimeout(() => {
        autoShareAchievement(`Level Up to ${customerLevel}!`);
    }, 2000);
}

function updateCustomerDisplay() {
    const levelElement = document.getElementById('customerLevel');
    const pointsElement = document.getElementById('customerPoints');
    
    if (levelElement) levelElement.textContent = customerLevel;
    if (pointsElement) pointsElement.textContent = customerPoints;
}

function saveCustomerProgress() {
    localStorage.setItem('customerPoints', customerPoints);
    localStorage.setItem('customerLevel', customerLevel);
}

function loadCustomerProgress() {
    const savedPoints = localStorage.getItem('customerPoints');
    const savedLevel = localStorage.getItem('customerLevel');
    
    if (savedPoints) customerPoints = parseInt(savedPoints);
    if (savedLevel) customerLevel = savedLevel;
}

function addFunEmojis(message) {
    if (!emojiResponses) return message;
    
    const funEmojis = ['😊', '🎉', '✨', '🌟', '💫', '🎯', '🔥', '💎', '🚀', '🎪'];
    const randomEmoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];
    
    return `${randomEmoji} ${message}`;
}

// Social Sharing Functions
function shareToSocial(platform) {
    showShareModal(platform);
}

function showShareModal(platform = null) {
    const modal = document.getElementById('shareModal');
    const preview = document.getElementById('sharePreview');
    
    // Reset share options
    document.querySelectorAll('.share-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Set default share type
    selectedShareType = 'achievement';
    document.querySelector('.share-option').classList.add('selected');
    
    // Update preview
    updateSharePreview();
    
    modal.style.display = 'block';
    
    // Add points for sharing
    addPoints(10, "Social sharing");
}

function selectShareType(type) {
    selectedShareType = type;
    
    // Update visual selection
    document.querySelectorAll('.share-option').classList.remove('selected');
    event.target.closest('.share-option').classList.add('selected');
    
    // Update preview
    updateSharePreview();
}

function updateSharePreview() {
    const preview = document.getElementById('sharePreview');
    
    switch(selectedShareType) {
        case 'achievement':
            preview.innerHTML = `
                <h4>🏆 Achievement Unlocked!</h4>
                <p>I just reached <strong>${customerLevel}</strong> level with <strong>${customerPoints}</strong> points in the InStore Bot! 🎉</p>
                <p>Join me and discover amazing deals while earning rewards! #InStoreBot #ShoppingRewards</p>
            `;
            break;
        case 'deal':
            const randomDeal = hotDeals[Math.floor(Math.random() * hotDeals.length)];
            preview.innerHTML = `
                <h4>🔥 Amazing Deal Found!</h4>
                <p>Just found <strong>${randomDeal.name}</strong> on sale for <strong>$${randomDeal.discountedPrice}</strong> (${randomDeal.discount}% off)! 💰</p>
                <p>Thanks to InStore Bot for helping me discover this great deal! #HotDeals #InStoreBot</p>
            `;
            break;
        case 'experience':
            preview.innerHTML = `
                <h4>🎉 Shopping Made Fun!</h4>
                <p>Having an amazing shopping experience with InStore Bot! Found great deals, earned points, and got personalized assistance! 🛒</p>
                <p>This AI shopping assistant is a game-changer! #SmartShopping #InStoreBot</p>
            `;
            break;
        case 'custom':
            preview.innerHTML = `
                <h4>✏️ Custom Message</h4>
                <p>Share your own shopping experience and achievements with friends!</p>
                <textarea id="customMessage" placeholder="Write your message here..." style="width: 100%; min-height: 80px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 0.75rem; color: white; font-family: inherit; resize: vertical;"></textarea>
            `;
            break;
    }
}

function shareContent() {
    const preview = document.getElementById('sharePreview');
    let message = '';
    
    switch(selectedShareType) {
        case 'achievement':
            message = `🏆 Achievement Unlocked! I just reached ${customerLevel} level with ${customerPoints} points in the InStore Bot! 🎉 Join me and discover amazing deals while earning rewards! #InStoreBot #ShoppingRewards`;
            break;
        case 'deal':
            const randomDeal = hotDeals[Math.floor(Math.random() * hotDeals.length)];
            message = `🔥 Amazing Deal Found! Just found ${randomDeal.name} on sale for $${randomDeal.discountedPrice} (${randomDeal.discount}% off)! 💰 Thanks to InStore Bot for helping me discover this great deal! #HotDeals #InStoreBot`;
            break;
        case 'experience':
            message = `🎉 Shopping Made Fun! Having an amazing shopping experience with InStore Bot! Found great deals, earned points, and got personalized assistance! 🛒 This AI shopping assistant is a game-changer! #SmartShopping #InStoreBot`;
            break;
        case 'custom':
            const customText = document.getElementById('customMessage')?.value || '';
            message = customText || 'Check out this amazing shopping experience with InStore Bot! #InStoreBot';
            break;
    }
    
    // Share to multiple platforms
    shareToMultiplePlatforms(message);
    
    // Close modal
    closeShareModal();
    
    // Show success message
    addMessage(`🎉 Shared successfully! Thanks for spreading the word about InStore Bot!`, 'bot', 'fun-message');
    addPoints(15, "Content shared");
}

function shareToMultiplePlatforms(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = encodeURIComponent(window.location.href);
    
    // Facebook
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedMessage}`;
    
    // Twitter
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${url}`;
    
    // WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}%20${url}`;
    
    // LinkedIn
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    // Open sharing windows
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setTimeout(() => {
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }, 500);
    setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'width=600,height=400');
    }, 1000);
}

function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// Share specific deal
function shareDeal(dealId) {
    const deal = hotDeals.find(d => d.id === dealId);
    if (!deal) return;
    
    const message = `🔥 Amazing Deal Found! Just found ${deal.name} on sale for $${deal.discountedPrice} (${deal.discount}% off)! 💰 Thanks to InStore Bot for helping me discover this great deal! #HotDeals #InStoreBot`;
    
    shareToMultiplePlatforms(message);
    addPoints(10, "Deal shared");
    
    // Show success message
    addMessage(`🎉 Shared the ${deal.name} deal! Thanks for spreading the word!`, 'bot', 'fun-message');
}

// Auto-share achievements
function autoShareAchievement(achievement) {
    const message = `🎉 ${achievement}! Just reached ${customerLevel} with ${customerPoints} points in InStore Bot! #ShoppingRewards #InStoreBot`;
    
    // Show auto-share notification
    const notification = document.createElement('div');
    notification.className = 'points-earned';
    notification.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
            <div>Auto-share your achievement?</div>
            <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem;">
                <button onclick="shareToMultiplePlatforms('${message}'); this.parentElement.parentElement.remove();" style="background: #667eea; border: none; color: white; padding: 0.5rem 1rem; border-radius: 15px; margin-right: 0.5rem; cursor: pointer;">Share</button>
                <button onclick="this.parentElement.parentElement.remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 0.5rem 1rem; border-radius: 15px; cursor: pointer;">Later</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

// Setup event listeners
function setupEventListeners() {
    const userInput = document.getElementById('userInput');
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auto-focus input
    userInput.focus();
}

// Initialize voice recognition
function initializeVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('userInput').value = transcript;
            sendMessage();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            toggleVoice();
        };
        
        recognition.onend = function() {
            toggleVoice();
        };
    }
}

// Send message function
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process message after a short delay to simulate thinking
    setTimeout(() => {
        processUserMessage(message);
        hideTypingIndicator();
    }, 1000 + Math.random() * 2000);
}

// Add message to chat
function addMessage(content, sender, className = '') {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message ${className}`;
    
    const avatar = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    const avatarBg = sender === 'bot' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    
    messageDiv.innerHTML = `
        <div class="message-avatar" style="background: ${avatarBg}">
            <i class="${avatar}"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                ${content}
            </div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Process user message
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Add points for interaction
    addPoints(5, "Daily interaction");
    
    // Check for different types of requests
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('looking for')) {
        handleProductSearch(message);
        addPoints(10, "Product search");
    } else if (lowerMessage.includes('inventory') || lowerMessage.includes('stock') || lowerMessage.includes('available')) {
        handleInventoryCheck(message);
        addPoints(8, "Inventory check");
    } else if (lowerMessage.includes('aisle') || lowerMessage.includes('where') || lowerMessage.includes('location')) {
        handleNavigationRequest(message);
        addPoints(12, "Navigation help");
    } else if (lowerMessage.includes('deal') || lowerMessage.includes('sale') || lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
        handleHotDealsRequest(message);
        addPoints(15, "Deal exploration");
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        showHelp();
        addPoints(5, "Help request");
    } else if (lowerMessage.includes('fun') || lowerMessage.includes('game') || lowerMessage.includes('points')) {
        handleFunRequest(message);
    } else {
        // Try to find products by name
        const foundProducts = searchProducts(message);
        if (foundProducts.length > 0) {
            showProductResults(foundProducts, message);
            addPoints(10, "Product found");
        } else {
            showDefaultResponse(message);
        }
    }
}

// Handle product search
function handleProductSearch(message) {
    const searchTerm = message.replace(/search|find|looking for/gi, '').trim();
    const results = searchProducts(searchTerm);
    
    if (results.length > 0) {
        showProductResults(results, searchTerm);
    } else {
        addMessage(`I couldn't find any products matching "${searchTerm}". Try searching for something else or ask me to show you what we have in stock.`, 'bot');
    }
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}

// Show product results
function showProductResults(products, searchTerm) {
    let response = `I found ${products.length} product(s) matching "${searchTerm}":\n\n`;
    
    products.forEach(product => {
        response += `
<div class="product-card" onclick="showProductDetails(${product.id})">
    <div class="product-header">
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <div class="product-price">$${product.price}</div>
        </div>
    </div>
    <div class="product-details">
        <div class="detail-item">
            <span class="detail-label">Category:</span>
            <span class="detail-value">${product.category}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Stock:</span>
            <span class="detail-value">${product.stock} available</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Location:</span>
            <span class="detail-value">Aisle ${product.aisle}, Shelf ${product.shelf}</span>
        </div>
    </div>
</div>`;
    });
    
    response += `\nClick on any product to see more details!`;
    addMessage(response, 'bot');
}

// Handle inventory check
function handleInventoryCheck(message) {
    const searchTerm = message.replace(/inventory|stock|available/gi, '').trim();
    
    if (searchTerm) {
        const results = searchProducts(searchTerm);
        if (results.length > 0) {
            let response = `Here's the current inventory for products matching "${searchTerm}":\n\n`;
            results.forEach(product => {
                const stockStatus = product.stock > 0 ? 
                    `<span style="color: #4ade80;">${product.stock} in stock</span>` : 
                    '<span style="color: #f5576c;">Out of stock</span>';
                
                response += `• ${product.name}: ${stockStatus} (Aisle ${product.aisle})\n`;
            });
            addMessage(response, 'bot');
        } else {
            addMessage(`I couldn't find any products matching "${searchTerm}" in our inventory.`, 'bot');
        }
    } else {
        // Show general inventory overview
        let response = `Here's our current inventory overview:\n\n`;
        const categories = {};
        
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = [];
            }
            categories[product.category].push(product);
        });
        
        Object.keys(categories).forEach(category => {
            const totalStock = categories[category].reduce((sum, product) => sum + product.stock, 0);
            response += `• ${category}: ${totalStock} items total\n`;
        });
        
        response += `\nWould you like to check inventory for a specific product?`;
        addMessage(response, 'bot');
    }
}

// Handle navigation request
function handleNavigationRequest(message) {
    const searchTerm = message.replace(/aisle|where|location/gi, '').trim();
    const results = searchProducts(searchTerm);
    
    if (results.length > 0) {
        showNavigationToProduct(results[0]);
    } else {
        addMessage(`I couldn't find a product matching "${searchTerm}". Could you please specify which product you're looking for?`, 'bot');
    }
}

// Show navigation to product
function showNavigationToProduct(product) {
    const aisle = product.aisle;
    const aisleInfo = storeLayout[aisle];
    
    let response = `I'll help you find ${product.name}!\n\n`;
    response += `**Location:** Aisle ${aisle} (${aisleInfo.name})\n`;
    response += `**Shelf:** ${product.shelf}\n\n`;
    response += `**Directions:** ${aisleInfo.direction}\n\n`;
    response += `Would you like me to show you step-by-step navigation?`;
    
    addMessage(response, 'bot');
    
    // Show navigation overlay
    setTimeout(() => {
        showNavigationOverlay(product);
    }, 500);
}

// Show navigation overlay
function showNavigationOverlay(product) {
    const overlay = document.getElementById('navigationOverlay');
    const stepsContainer = document.getElementById('navigationSteps');
    
    const steps = [
        {
            title: "Start Here",
            description: "You are at the store entrance"
        },
        {
            title: "Find Aisle " + product.aisle,
            description: storeLayout[product.aisle].direction
        },
        {
            title: "Locate Shelf " + product.shelf,
            description: `Look for ${product.name} on shelf ${product.shelf}`
        },
        {
            title: "Product Found!",
            description: `You've found ${product.name} - ${product.stock} available`
        }
    ];
    
    stepsContainer.innerHTML = '';
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'navigation-step';
        stepDiv.style.animationDelay = `${index * 0.2}s`;
        
        stepDiv.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <div class="step-title">${step.title}</div>
                <div class="step-description">${step.description}</div>
            </div>
        `;
        
        stepsContainer.appendChild(stepDiv);
    });
    
    overlay.style.display = 'block';
}

// Close navigation overlay
function closeNavigation() {
    document.getElementById('navigationOverlay').style.display = 'none';
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = product.name;
    
    modalBody.innerHTML = `
        <div class="product-header">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
        
        <p style="margin: 1rem 0; line-height: 1.6;">${product.description}</p>
        
        <div class="product-details">
            <div class="detail-item">
                <span class="detail-label">Category:</span>
                <span class="detail-value">${product.category}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Price:</span>
                <span class="detail-value">$${product.price}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Stock:</span>
                <span class="detail-value">${product.stock} available</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Location:</span>
                <span class="detail-value">Aisle ${product.aisle}, Shelf ${product.shelf}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Tags:</span>
                <span class="detail-value">${product.tags.join(', ')}</span>
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <button onclick="showNavigationToProduct(${JSON.stringify(product).replace(/"/g, '&quot;')})" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">
                <i class="fas fa-map-marker-alt"></i> Find This Product
            </button>
            <button onclick="closeModal()" style="
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">
                Close
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Show help
function showHelp() {
    const helpMessage = `I'm your personal shopping assistant! Here's what I can help you with:

🔍 **Product Search**: "Find razor" or "Search for foundation"
📦 **Inventory Check**: "Check stock of foundation" or "How many razors do you have?"
🗺️ **Navigation**: "Where is the razor?" or "Take me to aisle 3"
🔥 **Hot Deals**: "Show me deals" or "What's on sale?"
🎮 **Fun Mode**: "Show me my points" or "Let's play a game"
ℹ️ **Product Info**: Ask about any product for detailed information

🎯 **Earn Points**: Every interaction earns you points and helps you level up!
🏆 **Level System**: Progress from New Shopper to Shopping Master
🎉 **Celebrations**: Enjoy confetti and animations when you achieve goals

You can also use the quick action buttons below for faster access!

What would you like to do?`;
    
    addMessage(helpMessage, 'bot');
}

// Show default response
function showDefaultResponse(message) {
    const responses = [
        `I'm not sure I understood "${message}". Could you try asking me to search for a product, check inventory, or help you find something in the store?`,
        `I didn't quite catch that. Try asking me to find a product, check stock levels, or help you navigate to a specific aisle.`,
        `I'm here to help you shop! You can ask me to search for products, check inventory, or help you find items in the store.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, 'bot');
}

// Display hot deals
function displayHotDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    if (!dealsGrid) return;
    
    dealsGrid.innerHTML = '';
    
    hotDeals.forEach(deal => {
        const dealCard = document.createElement('div');
        dealCard.className = 'deal-card';
        dealCard.onclick = () => showDealDetails(deal);
        
        dealCard.innerHTML = `
            <div class="deal-header">
                <div class="product-image-container">
                    <img src="${deal.imageUrl}" alt="${deal.name}" class="product-real-image loading" onload="this.classList.remove('loading')" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-image-fallback">
                        ${deal.image}
                        <div class="discount-badge">-${deal.discount}%</div>
                    </div>
                    <div class="discount-badge" style="display: ${deal.imageUrl ? 'block' : 'none'};">-${deal.discount}%</div>
                </div>
                <div class="deal-info">
                    <h4>${deal.name}</h4>
                    <div class="deal-price">
                        <span class="original-price">$${deal.originalPrice}</span>
                        <span class="discounted-price">$${deal.discountedPrice}</span>
                    </div>
                </div>
            </div>
            <div class="deal-description">${deal.description}</div>
            <div class="deal-features">
                ${deal.features.map(feature => `<span class="deal-feature">${feature}</span>`).join('')}
            </div>
            <div class="deal-footer">
                <span class="stock-status">${deal.stock} in stock</span>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="view-details-btn" onclick="event.stopPropagation(); showDealDetails('${deal.id}')">
                        View Details
                    </button>
                    <button class="share-deal-btn" onclick="event.stopPropagation(); shareDeal('${deal.id}')" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem 0.75rem; border-radius: 20px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
        `;
        
        dealsGrid.appendChild(dealCard);
    });
}

// Show deal details
function showDealDetails(dealId) {
    const deal = typeof dealId === 'string' ? hotDeals.find(d => d.id === dealId) : dealId;
    if (!deal) return;
    
    // Add points for viewing deal details
    addPoints(20, "Deal exploration");
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span>${deal.name}</span>
            <div style="background: #667eea; color: white; padding: 0.25rem 0.75rem; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">
                HOT DEAL -${deal.discount}%
            </div>
        </div>
    `;
    
    const daysLeft = Math.ceil((new Date(deal.dealEnds) - new Date()) / (1000 * 60 * 60 * 24));
    
    modalBody.innerHTML = `
        <div class="product-header">
            <div class="product-image-container">
                <img src="${deal.imageUrl}" alt="${deal.name}" class="product-real-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-fallback" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: none;">${deal.image}</div>
            </div>
            <div class="product-info">
                <h4>${deal.name}</h4>
                <div class="deal-price" style="margin-top: 0.5rem;">
                    <span class="original-price">$${deal.originalPrice}</span>
                    <span class="discounted-price" style="font-size: 1.3rem;">$${deal.discountedPrice}</span>
                </div>
            </div>
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border: 1px solid rgba(102, 126, 234, 0.2); border-radius: 12px; padding: 1rem; margin: 1rem 0;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <i class="fas fa-star" style="color: #667eea;"></i>
                <span style="font-weight: 600; color: #667eea;">Limited Time Offer!</span>
            </div>
            <p style="margin: 0; color: #a0a0a0; font-size: 0.9rem;">
                This deal ends in <strong style="color: #667eea;">${daysLeft} days</strong>. Don't miss out!
            </p>
        </div>
        
        <p style="margin: 1rem 0; line-height: 1.6;">${deal.description}</p>
        
        <div class="product-details">
            <div class="detail-item">
                <span class="detail-label">Category:</span>
                <span class="detail-value">${deal.category}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Original Price:</span>
                <span class="detail-value" style="text-decoration: line-through; color: #888;">$${deal.originalPrice}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Sale Price:</span>
                <span class="detail-value" style="color: #4ade80; font-weight: 600;">$${deal.discountedPrice}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">You Save:</span>
                <span class="detail-value" style="color: #667eea; font-weight: 600;">$${(deal.originalPrice - deal.discountedPrice).toFixed(2)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Stock:</span>
                <span class="detail-value">${deal.stock} available</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Location:</span>
                <span class="detail-value">Aisle ${deal.aisle}, Shelf ${deal.shelf}</span>
            </div>
        </div>
        
                            <div style="margin: 1.5rem 0;">
            <h5 style="margin-bottom: 0.75rem; color: #fff;">Product Image:</h5>
            <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
                <div style="position: relative; width: 200px; height: 200px; border-radius: 15px; overflow: hidden; border: 2px solid rgba(102, 126, 234, 0.2);">
                    <img src="${deal.imageUrl}" alt="${deal.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: none; align-items: center; justify-content: center; font-size: 3rem; color: white;">
                        ${deal.image}
                    </div>
                </div>
            </div>
        </div>
        
        <div style="margin: 1.5rem 0;">
            <h5 style="margin-bottom: 0.75rem; color: #fff;">Key Features:</h5>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${deal.features.map(feature => `
                    <span style="background: rgba(102, 126, 234, 0.1); color: #667eea; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500;">
                        ${feature}
                    </span>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
            <button onclick="showNavigationToProduct(${JSON.stringify(deal).replace(/"/g, '&quot;')})" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">
                <i class="fas fa-map-marker-alt"></i> Find This Deal
            </button>
            <button onclick="closeModal()" style="
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
            ">
                Close
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'search':
            addMessage("What product would you like to search for?", 'bot');
            break;
        case 'inventory':
            addMessage("Which product's inventory would you like to check?", 'bot');
            break;
        case 'navigate':
            addMessage("What product would you like me to help you find?", 'bot');
            break;
        case 'deals':
            showHotDealsMessage();
            break;
        case 'fun':
            showFunFeatures();
            break;
        case 'help':
            showHelp();
            break;
    }
}

// Handle hot deals request
function handleHotDealsRequest(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check if user is asking about a specific product in deals
    const foundDeal = hotDeals.find(deal => 
        deal.name.toLowerCase().includes(lowerMessage.replace(/deal|sale|discount|offer|show|what/gi, '').trim()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(lowerMessage.replace(/deal|sale|discount|offer|show|what/gi, '').trim()))
    );
    
    if (foundDeal) {
        showDealDetails(foundDeal);
        addMessage(`I found a great deal on ${foundDeal.name}! Check out the details above.`, 'bot');
    } else {
        showHotDealsMessage();
    }
}

// Handle fun requests
function handleFunRequest(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('points') || lowerMessage.includes('score')) {
        showPointsInfo();
    } else if (lowerMessage.includes('level') || lowerMessage.includes('rank')) {
        showLevelInfo();
    } else if (lowerMessage.includes('game') || lowerMessage.includes('play')) {
        startMiniGame();
    } else if (lowerMessage.includes('fun') || lowerMessage.includes('entertain')) {
        showFunFeatures();
    } else {
        showFunFeatures();
    }
}

// Show points information
function showPointsInfo() {
    const message = `🎯 **Your Shopping Stats** 🎯

💰 **Points**: ${customerPoints}
⭐ **Level**: ${customerLevel}
🎪 **Status**: ${getFunStatus()}

**How to earn more points:**
• Search products: +10 points
• Check inventory: +8 points  
• Get navigation help: +12 points
• Explore deals: +15 points
• Daily interactions: +5 points

Keep shopping to level up and unlock exclusive rewards! 🚀`;
    
    addMessage(message, 'bot', 'fun-message');
    addPoints(5, "Stats check");
}

// Show level information
function showLevelInfo() {
    const nextLevel = getNextLevel();
    const pointsNeeded = getPointsForNextLevel();
    
    const message = `🏆 **Level Information** 🏆

**Current Level**: ${customerLevel}
**Next Level**: ${nextLevel}
**Points Needed**: ${pointsNeeded} more points

**Level Benefits:**
• New Shopper: Basic assistance
• Regular Customer: +5% bonus points
• Smart Shopper: Priority support
• Deal Hunter: Exclusive deals
• Shopping Master: VIP treatment

You're doing great! Keep it up! 🌟`;
    
    addMessage(message, 'bot', 'fun-message');
    addPoints(5, "Level check");
}

// Start a mini game
function startMiniGame() {
    const games = [
        "🎲 **Shopping Trivia**: What's the best time to shop for deals?",
        "🎯 **Product Guessing**: I'll describe a product, you guess what it is!",
        "🎪 **Deal Hunt**: Find the best deal in our store!",
        "🎨 **Beauty Quiz**: Test your beauty product knowledge!"
    ];
    
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const message = `🎮 **Let's Play!** 🎮\n\n${randomGame}\n\nSay 'yes' to start the game!`;
    
    addMessage(message, 'bot', 'fun-message');
    addPoints(10, "Game started");
}

// Show fun features
function showFunFeatures() {
    const message = `🎪 **Fun Features Available!** 🎪

🎯 **Points System**: Earn points for every interaction
🏆 **Level Up**: Progress through shopping ranks
🎮 **Mini Games**: Play shopping trivia and games
🎉 **Celebrations**: Confetti and animations
🌟 **Achievements**: Unlock special rewards

Try saying:
• "Show me my points"
• "What's my level?"
• "Let's play a game"
• "Tell me a joke"

Have fun shopping! 🚀`;
    
    addMessage(message, 'bot', 'fun-message');
    addPoints(5, "Fun features explored");
}

// Helper functions
function getFunStatus() {
    if (customerPoints >= 1000) return "Shopping Legend";
    if (customerPoints >= 500) return "Deal Master";
    if (customerPoints >= 200) return "Smart Buyer";
    if (customerPoints >= 50) return "Regular Shopper";
    return "New Explorer";
}

function getNextLevel() {
    if (customerPoints < 50) return "Regular Customer";
    if (customerPoints < 200) return "Smart Shopper";
    if (customerPoints < 500) return "Deal Hunter";
    if (customerPoints < 1000) return "Shopping Master";
    return "Maximum Level!";
}

function getPointsForNextLevel() {
    if (customerPoints < 50) return 50 - customerPoints;
    if (customerPoints < 200) return 200 - customerPoints;
    if (customerPoints < 500) return 500 - customerPoints;
    if (customerPoints < 1000) return 1000 - customerPoints;
    return 0;
}

// Show hot deals message
function showHotDealsMessage() {
    const dealsMessage = `🔥 **Hot Deals Available!** 🔥

I've curated some amazing beauty deals just for you:

${hotDeals.map(deal => `• **${deal.name}** - Save ${deal.discount}% ($${deal.originalPrice} → $${deal.discountedPrice})`).join('\n')}

Check out the Hot Deals section above for more details, or ask me about any specific product!`;
    
    addMessage(dealsMessage, 'bot');
}

// Toggle voice recording
function toggleVoice() {
    if (!recognition) {
        addMessage("Voice recognition is not supported in your browser. Please type your message instead.", 'bot');
        return;
    }
    
    const voiceBtn = document.getElementById('voiceIcon');
    
    if (isRecording) {
        recognition.stop();
        isRecording = false;
        voiceBtn.className = 'fas fa-microphone';
        voiceBtn.parentElement.classList.remove('recording');
    } else {
        recognition.start();
        isRecording = true;
        voiceBtn.className = 'fas fa-stop';
        voiceBtn.parentElement.classList.add('recording');
    }
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    const navigationOverlay = document.getElementById('navigationOverlay');
    const shareModal = document.getElementById('shareModal');
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === navigationOverlay) {
        closeNavigation();
    }
    
    if (event.target === shareModal) {
        closeShareModal();
    }
});

// Handle escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeNavigation();
    }
}); 

// Associate Mode State
let isAssociateMode = false;
let associateTasks = [
    { id: 1, title: "Check Aisle 3 Inventory", description: "Verify stock levels for beauty products", priority: "high", completed: false },
    { id: 2, title: "Planogram Verification", description: "Confirm shelf layouts match planogram", priority: "medium", completed: false },
    { id: 3, title: "Restock Alert Review", description: "Review and process restock alerts", priority: "high", completed: false },
    { id: 4, title: "Aisle 7 Audit", description: "Complete end-of-day aisle audit", priority: "low", completed: false }
];

let inventoryData = [
    { id: 1, name: "L'Oreal Paris Foundation", aisle: "Aisle 3", shelf: "Shelf B", current: 5, min: 10, max: 50, status: "low" },
    { id: 2, name: "Maybelline Mascara", aisle: "Aisle 3", shelf: "Shelf C", current: 0, min: 5, max: 30, status: "out" },
    { id: 3, name: "Neutrogena Face Wash", aisle: "Aisle 3", shelf: "Shelf A", current: 25, min: 8, max: 40, status: "ok" },
    { id: 4, name: "CoverGirl Lipstick", aisle: "Aisle 3", shelf: "Shelf D", current: 3, min: 6, max: 25, status: "low" },
    { id: 5, name: "Revlon Nail Polish", aisle: "Aisle 3", shelf: "Shelf E", current: 15, min: 10, max: 35, status: "ok" }
];

let planogramData = [
    { id: 1, aisle: "Aisle 3", section: "Foundation", status: "correct", lastVerified: "2024-01-15" },
    { id: 2, aisle: "Aisle 3", section: "Mascara", status: "incorrect", lastVerified: "2024-01-14" },
    { id: 3, aisle: "Aisle 3", section: "Skincare", status: "pending", lastVerified: "2024-01-13" },
    { id: 4, aisle: "Aisle 3", section: "Lipstick", status: "correct", lastVerified: "2024-01-15" },
    { id: 5, aisle: "Aisle 3", section: "Nail Care", status: "pending", lastVerified: "2024-01-12" }
];

// Mode Toggle Function
function toggleMode() {
    isAssociateMode = !isAssociateMode;
    const modeBtn = document.getElementById('modeToggle');
    const quickActions = document.getElementById('quickActions');
    const associateActions = document.getElementById('associateActions');
    const dealsSection = document.getElementById('dealsSection');
    const associateDashboard = document.getElementById('associateDashboard');
    
    if (isAssociateMode) {
        modeBtn.classList.add('associate-active');
        modeBtn.innerHTML = '<i class="fas fa-shopping-cart"></i><span>Customer Mode</span>';
        quickActions.style.display = 'none';
        associateActions.style.display = 'flex';
        dealsSection.style.display = 'none';
        associateDashboard.style.display = 'block';
        
        // Update welcome message for associate
        updateAssociateWelcome();
        loadAssociateDashboard();
        
        // Add points for switching to associate mode
        addPoints(50);
        showMessage('bot', 'Welcome to Associate Mode! You now have access to inventory management and planogram verification tools. +50 points for switching modes! 🎯');
    } else {
        modeBtn.classList.remove('associate-active');
        modeBtn.innerHTML = '<i class="fas fa-user-tie"></i><span>Associate Mode</span>';
        quickActions.style.display = 'flex';
        associateActions.style.display = 'none';
        dealsSection.style.display = 'block';
        associateDashboard.style.display = 'none';
        
        // Update welcome message for customer
        updateCustomerWelcome();
        
        // Add points for switching back to customer mode
        addPoints(25);
        showMessage('bot', 'Welcome back to Customer Mode! You can now browse deals and get shopping assistance. +25 points for switching back! 🛍️');
    }
}

// Update Associate Welcome Message
function updateAssociateWelcome() {
    const chatMessages = document.getElementById('chatMessages');
    const welcomeMessage = chatMessages.querySelector('.bot-message .message-bubble');
    
    if (welcomeMessage) {
        welcomeMessage.innerHTML = `
            <h3>👨‍💼 Welcome to Associate Mode!</h3>
            <p>I'm your store management assistant. I can help you with:</p>
            <div class="capabilities">
                <div class="capability">
                    <i class="fas fa-clipboard-check"></i>
                    <span>Inventory Management</span>
                </div>
                <div class="capability">
                    <i class="fas fa-th-large"></i>
                    <span>Planogram Verification</span>
                </div>
                <div class="capability">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Restock Alerts</span>
                </div>
                <div class="capability">
                    <i class="fas fa-tasks"></i>
                    <span>Aisle Audits</span>
                </div>
            </div>
            <p>What would you like to work on today?</p>
        `;
    }
}

// Update Customer Welcome Message
function updateCustomerWelcome() {
    const chatMessages = document.getElementById('chatMessages');
    const welcomeMessage = chatMessages.querySelector('.bot-message .message-bubble');
    
    if (welcomeMessage) {
        welcomeMessage.innerHTML = `
            <h3>👋 Welcome to InStore Bot!</h3>
            <p>I'm your personal shopping assistant. I can help you with:</p>
            <div class="capabilities">
                <div class="capability">
                    <i class="fas fa-search"></i>
                    <span>Product Search</span>
                </div>
                <div class="capability">
                    <i class="fas fa-boxes"></i>
                    <span>Inventory Check</span>
                </div>
                <div class="capability">
                    <i class="fas fa-info-circle"></i>
                    <span>Product Info</span>
                </div>
                <div class="capability">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Aisle Navigation</span>
                </div>
            </div>
            <p>What would you like to do today?</p>
        `;
    }
}

// Load Associate Dashboard
function loadAssociateDashboard() {
    loadTasks();
    updateDashboardStats();
}

// Load Tasks
function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    associateTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.priority}`;
        taskItem.onclick = () => handleTaskClick(task);
        
        taskItem.innerHTML = `
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <div class="task-meta">
                <span class="priority ${task.priority}">${task.priority.toUpperCase()}</span>
                <span class="status ${task.completed ? 'completed' : 'pending'}">${task.completed ? '✓ Completed' : '⏳ Pending'}</span>
            </div>
        `;
        
        taskList.appendChild(taskItem);
    });
}

// Handle Task Click
function handleTaskClick(task) {
    showMessage('bot', `Opening task: ${task.title}. Let me help you with that! 📋`);
    
    switch (task.id) {
        case 1:
            handleAssociateAction('inventory-check');
            break;
        case 2:
            handleAssociateAction('planogram-verify');
            break;
        case 3:
            handleAssociateAction('restock-alert');
            break;
        case 4:
            handleAssociateAction('aisle-audit');
            break;
    }
}

// Update Dashboard Stats
function updateDashboardStats() {
    const lowStockCount = inventoryData.filter(item => item.status === 'low' || item.status === 'out').length;
    const alertCount = planogramData.filter(item => item.status === 'incorrect').length;
    
    document.getElementById('lowStockCount').textContent = lowStockCount;
    document.getElementById('alertCount').textContent = alertCount;
}

// Handle Associate Actions
function handleAssociateAction(action) {
    switch (action) {
        case 'inventory-check':
            showInventoryCheck();
            break;
        case 'planogram-verify':
            showPlanogramVerification();
            break;
        case 'restock-alert':
            showRestockAlerts();
            break;
        case 'aisle-audit':
            showAisleAudit();
            break;
        case 'product-location':
            showProductLocation();
            break;
        case 'reports':
            showReports();
            break;
    }
}

// Show Inventory Check
function showInventoryCheck() {
    const modal = document.getElementById('associateModal');
    const modalTitle = document.getElementById('associateModalTitle');
    const modalBody = document.getElementById('associateModalBody');
    
    modalTitle.textContent = 'Inventory Check - Aisle 3';
    modalBody.innerHTML = `
        <div class="inventory-check">
            <h4>Current Inventory Status</h4>
            ${inventoryData.map(item => `
                <div class="inventory-item ${item.status}">
                    <h4>${item.name}</h4>
                    <div class="inventory-details">
                        <div class="inventory-detail">
                            <span>Location:</span>
                            <span>${item.aisle}, ${item.shelf}</span>
                        </div>
                        <div class="inventory-detail">
                            <span>Current Stock:</span>
                            <span>${item.current} units</span>
                        </div>
                        <div class="inventory-detail">
                            <span>Min Level:</span>
                            <span>${item.min} units</span>
                        </div>
                        <div class="inventory-detail">
                            <span>Max Level:</span>
                            <span>${item.max} units</span>
                        </div>
                    </div>
                    <div class="inventory-status">
                        <span class="status-badge ${item.status}">
                            ${item.status === 'ok' ? '✓ In Stock' : 
                              item.status === 'low' ? '⚠ Low Stock' : '❌ Out of Stock'}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
    addPoints(30);
}

// Show Planogram Verification
function showPlanogramVerification() {
    const modal = document.getElementById('associateModal');
    const modalTitle = document.getElementById('associateModalTitle');
    const modalBody = document.getElementById('associateModalBody');
    
    modalTitle.textContent = 'Planogram Verification - Aisle 3';
    modalBody.innerHTML = `
        <div class="planogram-verify">
            <h4>Planogram Status Check</h4>
            ${planogramData.map(item => `
                <div class="planogram-item">
                    <h4>${item.section}</h4>
                    <div class="planogram-status">
                        <div class="status-indicator ${item.status}"></div>
                        <span>Status: ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                        <span class="last-verified">Last verified: ${item.lastVerified}</span>
                    </div>
                    <div class="planogram-actions">
                        <button class="planogram-btn verify" onclick="verifyPlanogram(${item.id})">
                            <i class="fas fa-check"></i> Verify
                        </button>
                        <button class="planogram-btn flag" onclick="flagPlanogram(${item.id})">
                            <i class="fas fa-flag"></i> Flag Issue
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
    addPoints(25);
}

// Show Restock Alerts
function showRestockAlerts() {
    const modal = document.getElementById('associateModal');
    const modalTitle = document.getElementById('associateModalTitle');
    const modalBody = document.getElementById('associateModalBody');
    
    const lowStockItems = inventoryData.filter(item => item.status === 'low' || item.status === 'out');
    
    modalTitle.textContent = 'Restock Alerts';
    modalBody.innerHTML = `
        <div class="restock-alerts">
            <h4>Items Requiring Attention</h4>
            ${lowStockItems.map(item => `
                <div class="alert-item ${item.status}">
                    <h4>${item.name}</h4>
                    <p><strong>Current Stock:</strong> ${item.current} units</p>
                    <p><strong>Minimum Required:</strong> ${item.min} units</p>
                    <p><strong>Location:</strong> ${item.aisle}, ${item.shelf}</p>
                    <div class="alert-actions">
                        <button class="alert-btn restock" onclick="processRestock(${item.id})">
                            <i class="fas fa-boxes"></i> Process Restock
                        </button>
                        <button class="alert-btn order" onclick="placeOrder(${item.id})">
                            <i class="fas fa-shopping-cart"></i> Place Order
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
    addPoints(40);
}

// Show Aisle Audit
function showAisleAudit() {
    const modal = document.getElementById('associateModal');
    const modalTitle = document.getElementById('associateModalTitle');
    const modalBody = document.getElementById('associateModalBody');
    
    modalTitle.textContent = 'Aisle 7 Audit';
    modalBody.innerHTML = `
        <div class="aisle-audit">
            <h4>End-of-Day Aisle Audit Checklist</h4>
            <div class="audit-checklist">
                <div class="audit-item">
                    <input type="checkbox" id="audit1">
                    <label for="audit1">All products properly faced and aligned</label>
                </div>
                <div class="audit-item">
                    <input type="checkbox" id="audit2">
                    <label for="audit2">Price tags are visible and accurate</label>
                </div>
                <div class="audit-item">
                    <input type="checkbox" id="audit3">
                    <label for="audit3">No expired products on shelves</label>
                </div>
                <div class="audit-item">
                    <input type="checkbox" id="audit4">
                    <label for="audit4">Aisle is clean and organized</label>
                </div>
                <div class="audit-item">
                    <input type="checkbox" id="audit5">
                    <label for="audit5">Security tags are properly applied</label>
                </div>
            </div>
            <div class="audit-actions">
                <button class="audit-btn complete" onclick="completeAudit()">
                    <i class="fas fa-check-circle"></i> Complete Audit
                </button>
                <button class="audit-btn save" onclick="saveAudit()">
                    <i class="fas fa-save"></i> Save Progress
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    addPoints(35);
}

// Show Product Location
function showProductLocation() {
    showMessage('bot', 'Product Location Tool activated! 📍 What product are you looking for?');
    addPoints(15);
}

// Show Reports
function showReports() {
    const modal = document.getElementById('associateModal');
    const modalTitle = document.getElementById('associateModalTitle');
    const modalBody = document.getElementById('associateModalBody');
    
    modalTitle.textContent = 'Reports Dashboard';
    modalBody.innerHTML = `
        <div class="reports-dashboard">
            <h4>Available Reports</h4>
            <div class="report-options">
                <div class="report-option" onclick="generateReport('inventory')">
                    <i class="fas fa-boxes"></i>
                    <h5>Inventory Report</h5>
                    <p>Detailed stock levels and trends</p>
                </div>
                <div class="report-option" onclick="generateReport('planogram')">
                    <i class="fas fa-th-large"></i>
                    <h5>Planogram Compliance</h5>
                    <p>Shelf layout verification status</p>
                </div>
                <div class="report-option" onclick="generateReport('sales')">
                    <i class="fas fa-chart-line"></i>
                    <h5>Sales Analytics</h5>
                    <p>Performance metrics and trends</p>
                </div>
                <div class="report-option" onclick="generateReport('tasks')">
                    <i class="fas fa-tasks"></i>
                    <h5>Task Completion</h5>
                    <p>Associate productivity metrics</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    addPoints(20);
}

// Generate Report
function generateReport(type) {
    showMessage('bot', `Generating ${type} report... 📊 This may take a moment.`);
    
    setTimeout(() => {
        showMessage('bot', `${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully! 📈 Check your email for the detailed report.`);
        addPoints(50);
        closeAssociateModal();
    }, 2000);
}

// Verify Planogram
function verifyPlanogram(id) {
    const item = planogramData.find(item => item.id === id);
    if (item) {
        item.status = 'correct';
        item.lastVerified = new Date().toISOString().split('T')[0];
        showMessage('bot', `Planogram for ${item.section} verified as correct! ✅`);
        addPoints(25);
        closeAssociateModal();
        showPlanogramVerification(); // Refresh the view
    }
}

// Flag Planogram
function flagPlanogram(id) {
    const item = planogramData.find(item => item.id === id);
    if (item) {
        item.status = 'incorrect';
        showMessage('bot', `Planogram issue flagged for ${item.section}. A supervisor will be notified. 🚨`);
        addPoints(15);
    }
}

// Process Restock
function processRestock(id) {
    const item = inventoryData.find(item => item.id === id);
    if (item) {
        item.current = item.max;
        item.status = 'ok';
        showMessage('bot', `Restock processed for ${item.name}. Stock updated to ${item.max} units. 📦`);
        addPoints(30);
        closeAssociateModal();
        showRestockAlerts(); // Refresh the view
    }
}

// Place Order
function placeOrder(id) {
    const item = inventoryData.find(item => item.id === id);
    if (item) {
        showMessage('bot', `Order placed for ${item.name}. Expected delivery in 2-3 business days. 📋`);
        addPoints(20);
    }
}

// Complete Audit
function completeAudit() {
    showMessage('bot', 'Aisle 7 audit completed successfully! All checklist items verified. ✅');
    addPoints(100);
    closeAssociateModal();
}

// Save Audit
function saveAudit() {
    showMessage('bot', 'Audit progress saved. You can continue later. 💾');
    addPoints(25);
}

// Close Associate Modal
function closeAssociateModal() {
    document.getElementById('associateModal').style.display = 'none';
} 