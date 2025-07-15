// Global variables
let isRecording = false;
let recognition = null;

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
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
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
    
    // Check for different types of requests
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('looking for')) {
        handleProductSearch(message);
    } else if (lowerMessage.includes('inventory') || lowerMessage.includes('stock') || lowerMessage.includes('available')) {
        handleInventoryCheck(message);
    } else if (lowerMessage.includes('aisle') || lowerMessage.includes('where') || lowerMessage.includes('location')) {
        handleNavigationRequest(message);
    } else if (lowerMessage.includes('deal') || lowerMessage.includes('sale') || lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
        handleHotDealsRequest(message);
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
        showHelp();
    } else {
        // Try to find products by name
        const foundProducts = searchProducts(message);
        if (foundProducts.length > 0) {
            showProductResults(foundProducts, message);
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
ℹ️ **Product Info**: Ask about any product for detailed information

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
                <button class="view-details-btn" onclick="event.stopPropagation(); showDealDetails('${deal.id}')">
                    View Details
                </button>
            </div>
        `;
        
        dealsGrid.appendChild(dealCard);
    });
}

// Show deal details
function showDealDetails(dealId) {
    const deal = typeof dealId === 'string' ? hotDeals.find(d => d.id === dealId) : dealId;
    if (!deal) return;
    
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
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === navigationOverlay) {
        closeNavigation();
    }
});

// Handle escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeNavigation();
    }
}); 