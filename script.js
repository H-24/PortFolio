(function(){
    const spanEl = document.querySelector("main h2 span");
    const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];
    let index = 0;
    let currentTxt = txtArr[index].split(""); 
    function writeTxt() {
        spanEl.textContent += currentTxt.shift();
        if(currentTxt.length !== 0){
            setTimeout(writeTxt, Math.floor(Math.random() * 100));  // 0.n초 뒤에 다시 writeTxt를 실행해서 반복하게 해줌
        }else{
            currentTxt = spanEl.textContent.split("");
            setTimeout(deleteTxt, 3000);
        }
    }
    function deleteTxt() {
        currentTxt.pop();
        spanEl.textContent = currentTxt.join("");
        if (currentTxt.length !== 0){
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        }else{
            index = (index+1) % txtArr.length;
            currentTxt = txtArr[index].split("");
            console.log(currentTxt);
            writeTxt();
        }
    }
    writeTxt();
})();

/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
const headerEl = document.querySelector("header");
window.addEventListener('scroll', function(){
    requestAnimationFrame(scrollCheck); /* 스크롤처럼 이벤트가 너무 많이 발생할때 사용 1프레임당 한번(1초에 최대 60번)만 실행 */
});
function scrollCheck(){
    let browserScrollY = window.scroll ? window.scrollY : window.pageYOffset;
    if(browserScrollY > 0){
        headerEl.classList.add("active");
    }else{
        headerEl.classList.remove("active");
    }
}

/* 애니메이션 스크롤 이동 */
const animationMove = function(selector){
    // 1) selector 매개변수로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);
    // 2) 현재 웹 브라우저의 스크롤 정보(y값)
    const browserScrollY = window.pageYOffset;
    // 3) 이동할 대상의 위치(y값)
    const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY; // getBoundingClientRect().top - 뷰포트 기준으로 대상의 top위치 이므로 현재 사용자의 view 즉 스크롤한 정도를 더해주어야함
    // 4) 스크롤 이동 
    window.scrollTo({top: targetScrollY, behavior: 'smooth'});
};

// 스크롤 이벤트 연결
const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");
scrollMoveEl.forEach(el => {
    el.addEventListener('click', e => {
        animationMove(el.dataset.target);
    });
});