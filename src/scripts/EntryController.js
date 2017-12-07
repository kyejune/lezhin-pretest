import Entry from './Entry';

export default class EntryController{

    constructor(){

        this._round = this._totalRound = 16; // n강
        this._matchOfRound = 0; // 라운드 n번째 시합
        this.entriesOfRound = []; // 해당라운드 등록 선수들

        this._all = [
            new Entry( 0, '혜리', './images/partner0.gif',  this._round ),
            new Entry( 1, '다현', './images/partner1.gif',  this._round ),
            new Entry( 2, '주이', './images/partner2.gif',  this._round ),
            new Entry( 3, '사나', './images/partner3.gif',  this._round ),
            new Entry( 4, '시노자키 아이', './images/partner4.gif',  this._round ),
            new Entry( 5, '제니', './images/partner5.gif',  this._round ),
            new Entry( 6, '아이유', './images/partner6.gif',  this._round ),
            new Entry( 7, '홍석천', './images/partner7.png',  this._round ),
            new Entry( 8, '손나은', './images/partner8.gif',  this._round ),
            new Entry( 9, '박나래', './images/partner9.gif',  this._round ),
            new Entry( 10, '양정원', './images/partner10.gif',  this._round ),
            new Entry( 11, '이국주', './images/partner11.gif',  this._round ),
            new Entry( 12, '이수현', './images/partner12.gif',  this._round ),
            new Entry( 13, '전효성', './images/partner13.gif',  this._round ),
            new Entry( 14, '최유정', './images/partner14.gif',  this._round ),
            new Entry( 15, '홍진영', './images/partner15.gif',  this._round ),
        ];

        this._updateEntriesByRound();
    }

    /* Get Properties */
    get totalRound() {
        return this._totalRound;
    }

    /* Public Method */
    prevStage(){

        // 스테이지 이동이 필요
        if( this._matchOfRound == 0 ){

            this._round *= 2;
            this._matchOfRound = this._round/2 -1;

        // 스테이지 이동이 불필요
        }else{

            this._matchOfRound--;
        }

        // this._setMaxRound( this._round );
        this._updateEntriesByRound( true );

        return this.getMatch();
    }


    setResult( $winner, $loser ){

        this._getEntryById( $winner ).next();
        this._getEntryById( $loser ).stop();

        this._matchOfRound++;


        // 매치 끝났으면 다음 라운드
        if( this._matchOfRound >= this._round/2 )
        {
            this._round /= 2;
            this._matchOfRound = 0;
            this._updateEntriesByRound();
        }

        return this.getMatch();
    }

    getMatch(){
        return {
            game:[this.entriesOfRound[this._matchOfRound*2], this.entriesOfRound[this._matchOfRound*2 + 1]],
            round: this._round,
            match: this._matchOfRound
        }
    }

    /* Private Function */
    _updateEntriesByRound( $isReverse = false ){
        var matchNo = 0;

        this.entriesOfRound = this._all.filter( ( item )=>{

            let isEntry = item.roundOf <= this._round;
            if( isEntry ) {
                matchNo += .5;
                item.matchOfRound = Math.round(matchNo) -1;

                if( $isReverse ) {

                    if ( item.roundOf < this._round &&  item.matchOfRound >= this._matchOfRound ) {
                        item.roundOf *= 2;
                    }
                }
            }

            return isEntry;
        });
    }

    _getEntryById( $id ){
        let entry;

        this._all.some( (item)=>{
            entry = item;
            return item.id == $id;
        });

        return entry;
    }

}