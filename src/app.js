import EntryController from './scripts/EntryController';
import Utils from './scripts/Utils';

import './app.scss';


/* init */
const ec = new EntryController();
const boxElement = document.querySelector('.entry__box');
const entryElements = document.querySelectorAll('.entry');
const particleElement = document.querySelector('.particle__box');

drawGame( ec.getMatch() );

window.ec = ec;
/* 이벤트 등록 */

// 클릭시 EntryController에 결과를 전송하고 새 게임을 그리는 함수 호출
document.querySelectorAll('.entry__btn').forEach( (btn, index)=>{

    let entryElement = btn.parentElement;

    // 선택하기 클릭
    btn.addEventListener( 'click', ()=>{
        let selectedKey = parseInt( entryElement.dataset.key);

        let keys = [parseInt(entryElements[0].dataset.key), parseInt(entryElements[1].dataset.key)];

        if( selectedKey !== keys[0] )
            keys = keys.reverse();

        let next = ec.setResult.apply( ec, keys );
        drawGame( next );
    });

    // 선택하기 오버 효과
    btn.addEventListener( 'mouseover', event=>{

        entryElement.insertBefore( particleElement, entryElement.firstChild );

    });

    // 선택하기 아웃 효과
    btn.addEventListener( 'mouseout', event=>{

        document.querySelector('.app').appendChild( particleElement );

    });


    // 되돌아가기 버튼 클릭
    boxElement.querySelector('.back__btn').addEventListener( 'click', event=>{
        event.stopImmediatePropagation();
        drawGame( ec.prevStage() );
    });

});






// 정보에 맞게 화면 갱신
function drawGame( $data ){

    let game = $data.game;


    // 우승자가 결정되면
    if( $data.round === 1 ){

        Utils.addClass( boxElement, 'status--finished' );

        let winElement = boxElement.querySelector(`.entry[data-key="${game[0].id}"]`);
        Utils.addClass( winElement, 'your-partner' );


        return
    }

    // 게임정보 세팅
    let isFinalMatch = $data.round==2;
    boxElement.querySelector('.round__text').innerText = isFinalMatch?'결승전':$data.round+'강';
    boxElement.querySelector('.match__text').innerText = isFinalMatch?'':$data.match+1+'차전';

    // 대전상대 세팅
    // boxElement.setAttribute( 'data-key', `[${game[0].id}, ${game[1].id}]` );
    entryElements.forEach( (element, index)=>{

        let img = element.querySelector('.entry__img');

        element.setAttribute( 'data-key', game[index].id );

        img.style.backgroundImage = `url(${ game[index].img }`;
        element.querySelector('.entry__name').innerText = game[index].name;

        Utils.addClass( img, 'bounce' );
        setTimeout( function(){
            Utils.removeClass( img, 'bounce' );
        }, 600 );

    });

    // 첫 게임 이외에는 되돌리기 버튼 활성화
    if( $data.round === ec.totalRound && $data.match === 0 )
        Utils.removeClass( boxElement.querySelector('.back__btn'), 'discover' );
    else
        Utils.addClass( boxElement.querySelector('.back__btn'), 'discover' );

}






