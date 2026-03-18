function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active"); 
        }
    }
}

window.addEventListener('scroll', () => {let current= "";
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight /3)){
            current = section.getAttribute('id')
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)){
            item.classList.add('active');
        }
    })
})

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX
    const posY = e.clientY

    cursorDot.style.left =`${posX}px`;
    cursorDot.style.top =`${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top:`${posY}px`,
    }, {duration: 200, fill: "forwards"})
});

const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // تحريك الزرار بنسبة 30% من حركة الماوس (عشان ما يهربش بعيد)
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    // يرجع الزرار مكانه أول ما الماوس يبعد
    btn.addEventListener('mouseleave', function() {
        this.style.transform = `translate(0px, 0px)`;
    });
});
const contactForm = document.querySelector('form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // منع الصفحة من التحميل
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'تم تسجيل البيانات!',
                    text: 'شكراً لتواصلك , هرد عليك في أقرب وقت.',
                    icon: 'success',
                    background: '#0a0e17',
                    color: '#fff',
                    confirmButtonColor: '#00d2ff'
                });
                this.reset(); // فضي الفورم بعد الإرسال
            }
        });
    });
}

window.addEventListener("scroll", reveal);


reveal();