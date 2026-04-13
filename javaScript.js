/* ===================================================================
   ELITE FIT — JavaScript
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== MOBILE NAV =====
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileNav);
  mobileOverlay.addEventListener('click', toggleMobileNav);

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const suffix = counter.closest('.hero-stat-label')?.textContent.includes('%') ? '' : '+';
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (current >= target ? suffix : '');
      }, 30);
    });
  }

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== TESTIMONIALS SLIDER =====
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;
  const totalSlides = track ? track.children.length : 0;

  function updateSlider() {
    if (!track) return;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      updateSlider();
    });

    nextBtn.addEventListener('click', () => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateSlider();
    });

    // Auto-slide
    setInterval(() => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      updateSlider();
    }, 6000);
  }

  // ===== BMI CALCULATOR =====
  const bmiForm = document.getElementById('bmiForm');
  const bmiResult = document.getElementById('bmiResult');
  const bmiValue = document.getElementById('bmiValue');
  const bmiStatus = document.getElementById('bmiStatus');

  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
      const weight = parseFloat(document.getElementById('bmiWeight').value);
      const age = parseInt(document.getElementById('bmiAge').value);

      if (!height || !weight || !age) return;

      const bmi = (weight / (height * height)).toFixed(1);
      bmiValue.textContent = bmi;

      let status, color;
      if (bmi < 18.5) {
        status = 'Underweight';
        color = '#3b82f6';
      } else if (bmi < 25) {
        status = 'Normal Weight — Great job!';
        color = '#39FF14';
      } else if (bmi < 30) {
        status = 'Overweight';
        color = '#f59e0b';
      } else {
        status = 'Obese';
        color = '#ef4444';
      }

      bmiStatus.textContent = status;
      bmiStatus.style.color = color;
      bmiValue.style.color = color;
      bmiResult.classList.add('show');
    });
  }

  // ===== BLOG DATA =====
  const blogPosts = [
    {
      id: 1,
      title: "5 Compound Exercises You Should Never Skip",
      excerpt: "Maximize your gains with these essential compound movements that work multiple muscle groups and boost overall strength.",
      tag: "Training",
      date: "April 10, 2026",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop",
      content: `
        <p>Compound exercises are the foundation of any effective training program. Unlike isolation exercises, they recruit multiple muscle groups simultaneously, making your workouts more efficient and effective.</p>
        <h3>1. Barbell Squat</h3>
        <p>The king of all exercises. Squats target your quads, hamstrings, glutes, core, and even your upper back. Whether you're looking to build muscle, burn fat, or improve athletic performance, squats should be non-negotiable in your routine.</p>
        <h3>2. Deadlift</h3>
        <p>The deadlift works your entire posterior chain — hamstrings, glutes, lower back, upper back, traps, and forearms. It's the ultimate test of total-body strength and has incredible carry-over to everyday functional movement.</p>
        <h3>3. Bench Press</h3>
        <p>The bench press is the gold standard for upper body pushing strength. It targets your chest, front delts, and triceps. Variations like incline and close-grip can shift emphasis to different areas.</p>
        <h3>4. Overhead Press</h3>
        <p>Standing overhead press builds impressive shoulder development while demanding core stability. It's one of the best indicators of true upper body pressing strength.</p>
        <h3>5. Barbell Row</h3>
        <p>Balance your pressing with rows. Bent-over rows build a thick, powerful back and improve posture. They target your lats, rhomboids, rear delts, and biceps.</p>
        <h3>Programming Tips</h3>
        <ul>
          <li>Start each workout with 1-2 compound lifts</li>
          <li>Use progressive overload — aim to increase weight or reps weekly</li>
          <li>Master form before chasing heavy weights</li>
          <li>Allow 2-3 minutes rest between heavy compound sets</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "The Ultimate Guide to Protein Intake for Muscle Growth",
      excerpt: "Learn exactly how much protein you need, when to eat it, and the best sources to maximize muscle protein synthesis.",
      tag: "Nutrition",
      date: "April 5, 2026",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop",
      content: `
        <p>Protein is the building block of muscle tissue. Getting your protein intake right is crucial for recovery, muscle growth, and body composition. Let's break down everything you need to know.</p>
        <h3>How Much Protein Do You Need?</h3>
        <p>Research consistently shows that 1.6 to 2.2 grams of protein per kilogram of body weight per day is optimal for muscle growth. For a 80kg individual, that's 128-176g of protein daily.</p>
        <h3>Timing Matters (But Not As Much As You Think)</h3>
        <p>While the "anabolic window" myth has been debunked, spreading protein across 3-5 meals throughout the day does optimize muscle protein synthesis. Aim for 25-40g per meal.</p>
        <h3>Best Protein Sources</h3>
        <ul>
          <li><strong>Chicken breast</strong> — 31g protein per 100g</li>
          <li><strong>Greek yogurt</strong> — 10g protein per 100g</li>
          <li><strong>Eggs</strong> — 13g protein per 100g</li>
          <li><strong>Salmon</strong> — 25g protein per 100g</li>
          <li><strong>Whey protein</strong> — 25g protein per scoop</li>
          <li><strong>Lean beef</strong> — 26g protein per 100g</li>
        </ul>
        <h3>Supplement Smart</h3>
        <p>Whey protein is the most researched and effective supplement for muscle growth. Use it to conveniently hit your daily targets, especially post-workout or between meals.</p>
      `
    },
    {
      id: 3,
      title: "How to Break Through a Strength Plateau",
      excerpt: "Stuck at the same weights? Here are proven strategies to break through plateaus and keep making progress in the gym.",
      tag: "Performance",
      date: "March 28, 2026",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&h=300&fit=crop",
      content: `
        <p>Every lifter hits plateaus — it's an inevitable part of the journey. But plateaus aren't roadblocks; they're signals that it's time to evolve your approach. Here's how to break through.</p>
        <h3>1. Deload Week</h3>
        <p>Sometimes, progress stalls because you're chronically fatigued. Take a planned deload week where you reduce volume and/or intensity by 40-50%. You'll often come back stronger than ever.</p>
        <h3>2. Change Your Rep Ranges</h3>
        <p>If you've been training in the 8-12 rep range exclusively, try cycling in blocks of 3-5 reps for strength or 12-20 reps for endurance. This novel stimulus forces adaptation.</p>
        <h3>3. Address Weak Points</h3>
        <p>Identify the weakest link in your main lifts. If your lockout is weak on bench press, add close-grip bench and board presses. Targeted accessory work can unlock new PRs.</p>
        <h3>4. Optimize Recovery</h3>
        <ul>
          <li>Get 7-9 hours of quality sleep</li>
          <li>Ensure you're in a caloric surplus or at maintenance</li>
          <li>Manage stress levels — cortisol inhibits recovery</li>
          <li>Consider adding creatine if you haven't already</li>
        </ul>
        <h3>5. Periodize Your Training</h3>
        <p>Instead of random workouts, follow a structured program with planned progression. Linear, undulating, or block periodization all work — the key is having a system.</p>
      `
    },
    {
      id: 4,
      title: "Morning vs Evening Workouts: Which Is Better?",
      excerpt: "The great debate settled with science. Find out the optimal training time for your goals, schedule, and body type.",
      tag: "Lifestyle",
      date: "March 20, 2026",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=300&fit=crop",
      content: `
        <p>The best workout time is one you can stick to consistently. But science does reveal some interesting differences between morning and evening training that might help you optimize.</p>
        <h3>Morning Training Advantages</h3>
        <ul>
          <li>Higher cortisol helps mobilize fat for energy</li>
          <li>Fewer schedule conflicts — consistency is easier</li>
          <li>Boosts metabolism for the rest of the day</li>
          <li>Improved mental clarity and focus throughout the day</li>
        </ul>
        <h3>Evening Training Advantages</h3>
        <ul>
          <li>Core body temperature peaks — better performance</li>
          <li>Higher testosterone levels for muscle building</li>
          <li>Greater flexibility and reduced injury risk</li>
          <li>Most strength records are set in late afternoon</li>
        </ul>
        <h3>The Verdict</h3>
        <p>Research shows that when total volume and intensity are equated, morning and evening trainees make similar long-term progress. The key factor is <strong>consistency</strong>. Choose the time that fits your lifestyle and stick with it.</p>
        <p>Pro tip: If you do switch training times, give yourself 2-3 weeks to adapt. Your body's circadian rhythm will adjust to your new schedule.</p>
      `
    },
    {
      id: 5,
      title: "Sleep & Muscle Growth: The Missing Piece",
      excerpt: "Discover why sleep is the most underrated anabolic tool and how to optimize your sleep for maximum recovery.",
      tag: "Recovery",
      date: "March 12, 2026",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=300&fit=crop",
      content: `
        <p>You can have the perfect training program and ideal nutrition, but without proper sleep, you're leaving gains on the table. Sleep is when the real magic happens.</p>
        <h3>What Happens During Sleep</h3>
        <p>Growth hormone release peaks during deep sleep — this is when your body repairs and builds muscle tissue. Studies show that sleep-deprived individuals have up to 60% less muscle protein synthesis.</p>
        <h3>How Poor Sleep Sabotages Your Gains</h3>
        <ul>
          <li>Decreased testosterone and growth hormone</li>
          <li>Increased cortisol (catabolic hormone)</li>
          <li>Impaired glucose metabolism and insulin sensitivity</li>
          <li>Reduced motivation and workout performance</li>
          <li>Increased hunger hormones leading to overeating</li>
        </ul>
        <h3>Optimize Your Sleep</h3>
        <ul>
          <li>Aim for 7-9 hours of quality sleep per night</li>
          <li>Keep your bedroom cool (65-68°F / 18-20°C)</li>
          <li>No screens 1 hour before bed</li>
          <li>Consider magnesium supplementation before bed</li>
          <li>Keep a consistent sleep/wake schedule</li>
        </ul>
      `
    },
    {
      id: 6,
      title: "Cardio Without Losing Muscle: The Smart Approach",
      excerpt: "Learn how to incorporate cardiovascular training into your routine without sacrificing your hard-earned muscle mass.",
      tag: "Training",
      date: "March 5, 2026",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&h=300&fit=crop",
      content: `
        <p>Cardio and muscle growth aren't enemies — but they need to coexist strategically. Here's how to keep your heart healthy without shrinking your muscles.</p>
        <h3>The Interference Effect</h3>
        <p>Research shows that excessive endurance training can interfere with muscle growth — a phenomenon called the "interference effect." But this doesn't mean you should skip cardio entirely.</p>
        <h3>Smart Cardio Strategies</h3>
        <ul>
          <li><strong>LISS (Low-Intensity Steady State):</strong> 20-40 minutes of walking, cycling, or incline treadmill. Minimal interference with recovery.</li>
          <li><strong>HIIT (High-Intensity Interval Training):</strong> 15-20 minutes, 2x per week maximum. Great for fat loss but more demanding on recovery.</li>
          <li><strong>Separate sessions:</strong> Keep cardio and lifting at least 6 hours apart when possible.</li>
        </ul>
        <h3>The Golden Rules</h3>
        <ul>
          <li>Always prioritize lifting over cardio</li>
          <li>Keep total cardio to 2-4 sessions per week</li>
          <li>Use low-impact modalities (cycling > running)</li>
          <li>Don't do intense cardio on leg days</li>
          <li>Increase calories to compensate for added activity</li>
        </ul>
      `
    }
  ];

  // Render blog cards
  const blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    blogPosts.slice(0, 6).forEach(post => {
      const card = document.createElement('div');
      card.classList.add('blog-card', 'reveal');
      card.setAttribute('data-blog-id', post.id);
      card.innerHTML = `
        <div class="blog-card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
          <span class="blog-card-tag">${post.tag}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-date"><i class="far fa-calendar"></i> ${post.date}</div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="read-more">Read More <i class="fas fa-arrow-right"></i></span>
        </div>
      `;
      blogGrid.appendChild(card);

      // Re-observe for reveal animation
      revealObserver.observe(card);

      // Open blog modal
      card.addEventListener('click', () => openBlogModal(post));
    });
  }

  // ===== BLOG MODAL =====
  const blogModal = document.getElementById('blogModal');
  const blogModalContent = document.getElementById('blogModalContent');
  const blogModalClose = document.getElementById('blogModalClose');
  const blogModalOverlay = document.getElementById('blogModalOverlay');

  function openBlogModal(post) {
    blogModalContent.innerHTML = `
      <button class="blog-modal-close" id="blogModalCloseInner"><i class="fas fa-times"></i></button>
      <img class="blog-modal-image" src="${post.image}" alt="${post.title}">
      <div class="blog-modal-body">
        <span class="blog-card-tag">${post.tag}</span>
        <h2>${post.title}</h2>
        <div class="date"><i class="far fa-calendar"></i> ${post.date}</div>
        <div class="content">${post.content}</div>
      </div>
    `;
    blogModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Attach close to new button
    document.getElementById('blogModalCloseInner').addEventListener('click', closeBlogModal);
  }

  function closeBlogModal() {
    blogModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (blogModalOverlay) blogModalOverlay.addEventListener('click', closeBlogModal);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBlogModal();
  });

  // ===== BOOKING FORM =====
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm) {
    // Set min date to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simulate booking submission
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        bookingForm.style.display = 'none';
        bookingSuccess.classList.add('show');
      }, 1500);
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#39FF14';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== TILT EFFECT ON CARDS (DESKTOP ONLY) =====
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.service-card, .program-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
