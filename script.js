// 모바일 네비게이션 토글
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 카운트다운 타이머
function updateCountdown() {
    const eventDate = new Date('2025-07-26T19:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<h2>공연이 시작되었습니다!</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 갤러리 라이트박스
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxCaption.textContent = item.dataset.caption;
        // 실제 이미지가 있다면 여기서 설정
        // lightboxImg.src = item.querySelector('img').src;
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// 스크롤 시 네비게이션 배경 변경
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }

    lastScroll = currentScroll;
});

// 공유 기능
document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', () => {
        const shareType = button.dataset.share;
        const url = window.location.href;
        const title = '밴드 공연 - 2025.07.26 수원 남문로데오 아트홀';
        
        if (shareType === 'kakao') {
            // 카카오톡 공유 (카카오 SDK 필요)
            alert('카카오톡 공유 기능은 카카오 SDK 설정이 필요합니다.');
        } else if (shareType === 'url') {
            // URL 복사
            navigator.clipboard.writeText(url).then(() => {
                alert('링크가 복사되었습니다!');
            }).catch(() => {
                alert('링크 복사에 실패했습니다.');
            });
        }
    });
});

// 애니메이션 효과 (스크롤 시 요소 나타내기)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
document.querySelectorAll('.info-card, .member, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 지도 초기화 (카카오맵 또는 네이버맵 API 사용 시)
function initMap() {
    const mapContainer = document.getElementById('map');
    
    // 카카오맵 API를 사용하는 경우
    if (window.kakao && window.kakao.maps) {
        const mapOption = {
            center: new kakao.maps.LatLng(37.2785986, 127.0162481), // 수원 남문로데오 좌표
            level: 3
        };
        
        const map = new kakao.maps.Map(mapContainer, mapOption);
        
        const markerPosition = new kakao.maps.LatLng(37.2785986, 127.0162481);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        
        marker.setMap(map);
    } else {
        // API가 로드되지 않은 경우 대체 콘텐츠
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <div style="text-align: center;">
                    <h3>수원 남문로데오 아트홀</h3>
                    <p>경기도 수원시 팔달구 행궁로 88 지하1층</p>
                    <br>
                    <a href="https://map.kakao.com/link/search/수원남문로데오아트홀" 
                       target="_blank" 
                       style="color: var(--primary-color); text-decoration: underline;">
                        카카오맵에서 보기
                    </a>
                </div>
            </div>
        `;
    }
}

// 페이지 로드 시 지도 초기화
window.addEventListener('load', initMap);

// 티켓 예매 버튼
document.querySelector('.ticket-button').addEventListener('click', () => {
    alert('예매 페이지로 이동합니다. (실제 구현 시 예매 링크 연결)');
});

// 페이지 로드 완료 시 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});