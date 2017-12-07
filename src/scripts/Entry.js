class Entry{

    constructor( $id, $name, $img, $roundOf ){
        this._id = $id;
        this._img = $img;
        this._name = $name;
        this._roundOf = $roundOf;
        this._matchOfRound = -1;
    }

    // static get

    next(){
        this._roundOf /= 2;
    }

    stop(){
        // console.log( this._name + '는 ' + this._roundOf + '에서 탈락' );
    }

    get id(){
        return this._id;
    }

    get img(){
        return this._img;
    }

    get name(){
        return this._name;
    }

    get roundOf(){
        return this._roundOf;
    }

    set roundOf( $value ){
        this._roundOf = $value;
    }

    get matchOfRound(){
        return this._matchOfRound;
    }

    set matchOfRound( $value ){
        this._matchOfRound = $value;
    }

}


export default Entry;