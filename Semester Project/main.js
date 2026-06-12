/**
 * SRC SPORTS ACADEMY - MAIN JAVASCRIPT
 * Interactive Features, Form Validation, Search, and More
 */

$(document).ready(function() {
    
    // ============================================
    // 1. HAMBURGER MENU TOGGLE
    // ============================================
    $('#hamburger').click(function() {
        $('#navbar').toggleClass('show');
        const expanded = $('#navbar').hasClass('show');
        $(this).attr('aria-expanded', expanded);
    });
    
    // Close menu when clicking a link (mobile)
    $('#navbar a').click(function() {
        if (window.innerWidth <= 767) {
            $('#navbar').removeClass('show');
            $('#hamburger').attr('aria-expanded', false);
        }
    });
    
    // ============================================
    // 2. VISITOR COUNTER (Local Storage)
    // ============================================
    function updateVisitorCounter() {
        let count = localStorage.getItem('visitorCount');
        if (count === null) {
            count = 1247; // Base count
        } else {
            count = parseInt(count) + 1;
        }
        localStorage.setItem('visitorCount', count);
        $('#visitorCount').text(count);
    }
    updateVisitorCounter();
    
    // ============================================
    // 3. SEARCH FUNCTIONALITY (jQuery-based)
    // ============================================
    const searchableContent = [
        { title: "Home", url: "index.html", keywords: "home welcome academy" },
        { title: "About Us", url: "about.html", keywords: "about mission vision values" },
        { title: "New Activities", url: "new-activities.html", keywords: "wrestling taekwondo judo volleyball new sports" },
        { title: "Events", url: "events.html", keywords: "events competitions tournaments schedule" },
        { title: "Blog", url: "blog.html", keywords: "blog news updates articles" },
        { title: "Register", url: "register.html", keywords: "register signup account registration" },
        { title: "Book Online", url: "book-online.html", keywords: "booking session training book" },
        { title: "Football", url: "index.html#sports", keywords: "football soccer training" },
        { title: "Table Tennis", url: "index.html#sports", keywords: "table tennis ping pong" },
        { title: "Gymnastics", url: "index.html#sports", keywords: "gymnastics flexibility strength" }
    ];
    
    $('#searchInput').on('input', function() {
        const query = $(this).val().toLowerCase().trim();
        const resultsContainer = $('#searchResults');
        
        if (query.length < 2) {
            resultsContainer.removeClass('show').empty();
            return;
        }
        
        const results = searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            let html = '';
            results.forEach(result => {
                html += `<div class="search-result-item" data-url="${result.url}">
                            <strong>${result.title}</strong>
                            <small style="display: block; color: #666;">${result.url}</small>
                         </div>`;
            });
            resultsContainer.html(html).addClass('show');
            
            // Click handler for results
            $('.search-result-item').click(function() {
                window.location.href = $(this).data('url');
            });
        } else {
            resultsContainer.html('<div class="search-result-item">No results found</div>').addClass('show');
        }
    });
    
    // Close search results when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.search-wrapper').length) {
            $('#searchResults').removeClass('show');
        }
    });
    
    // ============================================
    // 4. REGISTRATION FORM VALIDATION
    // ============================================
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Clear previous errors
        $('.error-message').text('');
        $('input, select').removeClass('error');
        
        // Validate Full Name
        const fullName = $('#fullName').val().trim();
        if (fullName === '') {
            $('#nameError').text('Full name is required');
            $('#fullName').addClass('error');
            isValid = false;
        } else if (fullName.length < 3) {
            $('#nameError').text('Name must be at least 3 characters');
            $('#fullName').addClass('error');
            isValid = false;
        }
        
        // Validate Email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            $('#emailError').text('Email is required');
            $('#email').addClass('error');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#emailError').text('Enter a valid email address');
            $('#email').addClass('error');
            isValid = false;
        }
        
        // Validate Phone
        const phone = $('#phone').val().trim();
        if (phone === '') {
            $('#phoneError').text('Phone number is required');
            $('#phone').addClass('error');
            isValid = false;
        } else if (phone.length < 8) {
            $('#phoneError').text('Enter a valid phone number');
            $('#phone').addClass('error');
            isValid = false;
        }
        
        // Validate Sport Interest
        if ($('#sportInterest').val() === '') {
            $('#sportInterest').addClass('error');
            isValid = false;
        }
        
        // Validate CAPTCHA
        const captchaInput = $('#captchaInput').val().trim();
        const captchaCode = $('#captchaCode').text();
        if (captchaInput === '') {
            $('#captchaError').text('Please enter the CAPTCHA code');
            $('#captchaInput').addClass('error');
            isValid = false;
        } else if (captchaInput !== captchaCode) {
            $('#captchaError').text('CAPTCHA code does not match');
            $('#captchaInput').addClass('error');
            isValid = false;
        }
        
        if (isValid) {
            // Store registration in localStorage (simulated)
            const userData = {
                name: fullName,
                email: email,
                phone: phone,
                sport: $('#sportInterest').val(),
                newsletter: $('#newsletterSubscribe').is(':checked'),
                registeredAt: new Date().toISOString()
            };
            localStorage.setItem('registeredUser', JSON.stringify(userData));
            
            // Show success message
            $('#registrationForm').hide();
            $('#registrationSuccess').show();
            
            // Simulate email confirmation
            console.log('Confirmation email sent to:', email);
            
            // Reset form after 3 seconds (for demo)
            setTimeout(() => {
                $('#registrationForm')[0].reset();
                $('#registrationForm').show();
                $('#registrationSuccess').hide();
            }, 3000);
        }
    });
    
    // ============================================
    // 5. BOOKING FORM VALIDATION
    // ============================================
    $('#bookingForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#bookingName').val().trim();
        const email = $('#bookingEmail').val().trim();
        const phone = $('#bookingPhone').val().trim();
        const sport = $('#sportSelect').val();
        const date = $('#sessionDate').val();
        const time = $('#sessionTime').val();
        
        let isValid = true;
        
        if (name === '') isValid = false;
        if (email === '' || !email.includes('@')) isValid = false;
        if (phone === '') isValid = false;
        if (sport === '') isValid = false;
        if (date === '') isValid = false;
        if (time === '') isValid = false;
        
        if (isValid) {
            // Store booking
            const booking = {
                name: name,
                email: email,
                phone: phone,
                sport: sport,
                date: date,
                time: time,
                experience: $('#experience').val(),
                requests: $('#specialRequests').val(),
                bookedAt: new Date().toISOString()
            };
            localStorage.setItem('latestBooking', JSON.stringify(booking));
            
            $('#bookingForm').hide();
            $('#bookingSuccess').show();
            
            // Simulate email sending
            console.log('Booking email sent to:', email);
            
            setTimeout(() => {
                $('#bookingForm')[0].reset();
                $('#bookingForm').show();
                $('#bookingSuccess').hide();
            }, 3000);
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // ============================================
    // 6. CAPTCHA REFRESH
    // ============================================
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        $('#captchaCode').text(captcha);
    }
    
    $('#refreshCaptcha').click(function() {
        generateCaptcha();
    });
    
    // Generate initial CAPTCHA
    generateCaptcha();
    
    // ============================================
    // 7. Q&A FORUM FUNCTIONALITY
    // ============================================
    $('#qaForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#questionName').val().trim();
        const question = $('#questionText').val().trim();
        
        if (name === '' || question === '') {
            alert('Please enter your name and question');
            return;
        }
        
        const questionHtml = `
            <div class="question-item">
                <p><strong>${escapeHtml(name)}</strong>: ${escapeHtml(question)}</p>
                <span class="answer">Waiting for coach response...</span>
            </div>
        `;
        
        $('#questionsList').append(questionHtml);
        $('#qaForm')[0].reset();
    });
    
    function escapeHtml(text) {
        return text.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }
    
    // ============================================
    // 8. SMOOTH SCROLLING
    // ============================================
    $('a[href^="#"]').click(function(e) {
        const target = $(this).attr('href');
        if (target === '#') return;
        
        const targetElement = $(target);
        if (targetElement.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 500);
        }
    });
    
    // ============================================
    // 9. ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop();
    $('nav ul li a').each(function() {
        const linkPage = $(this).attr('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            $(this).addClass('active');
        }
    });
    
    // ============================================
    // 10. FORM INPUT ANIMATIONS
    // ============================================
    $('input, select, textarea').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        $(this).parent().removeClass('focused');
    });
    
    // ============================================
    // 11. CONSOLE LOG FOR DEVELOPMENT (Optional)
    // ============================================
    console.log('SRC Sports Academy Website Loaded Successfully');
    console.log('Features: Hamburger Menu, Search, Form Validation, CAPTCHA, Visitor Counter');
});