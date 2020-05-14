class Recovered extends Molecule{
    constructor(_i){
        super(_i);
        
    }

    render(){
        noStroke()

            fill(0, 0, 255, 125);

        push()
        translate(this.position.x, this.position.y);

        ellipse(0, 0, this.radius * 2, this.radius * 2);

        noStroke();
        pop();

    }

    checkHealth(_indexValue) {
    }

}