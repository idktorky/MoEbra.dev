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

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. إزالة كلاس active من الزر النشط حالياً وإضافته للزر المكبوس
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            // 2. جلب نوع الفلتر المختار
            const filterValue = button.getAttribute('data-filter');

            // 3. فلترة الكروت بناءً على الكلاس الخاص بها
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
});

window.addEventListener("scroll", reveal);


reveal();