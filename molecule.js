class Molecule {
    constructor(_i) {
        this.position = createVector(random(radiusMax, width - radiusMax), random(radiusMax, height - radiusMax));
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        this.arrayPosition = _i;
        this.radius = random(radiusMin, radiusMax);
        this.intersecting = false;
        this.bounce = false;
    }

    render() {
        //noStroke()
        stroke(200, 200, 200);
        strokeWeight(3)

        if (this.intersecting) {
            fill(255, 50, 0, 255);
        }
        else {
            fill(0, 50, 50, 125);
        }

        push()
        translate(this.position.x, this.position.y);

        ellipse(0, 0, this.radius * 2, this.radius * 2);

        noStroke();
        // fill(255, 255, 255, 255);
        // textSize(30);
        // textAlign(CENTER, CENTER);
        // text(this.arrayPosition, 0, 0);
        pop();
    }

    step() {
        this.position.add(this.velocity);
    }

    checkEdges() {

        if (this.position.x < this.radius || this.position.x > width - this.radius) {

            this.velocity.x = this.velocity.x * -1
        }

        if (this.position.y < this.radius || this.position.y > height - visualHeight - this.radius) {
            this.velocity.y = this.velocity.y * -1
        }

    
    }

    checkIntersecting(_indexValue) {

        let dist = p5.Vector.sub(this.position, molecules[_indexValue].position);
        // console.log(dist)
        stroke(150,0,0,100);
        strokeWeight(1);
        if(showLines){
            line(this.position.x,this.position.y,molecules[_indexValue].position.x,molecules[_indexValue].position.y);
        }
        if (dist.mag() < this.radius + molecules[_indexValue].radius) {
            // console.log("changed")
            this.intersecting = true;
            molecules[_indexValue].intersecting = true;

            if(dist.mag() > 0.0){
            let heading = dist.heading();
            let moveDistance = abs(dist.mag() - this.radius - molecules[_indexValue].radius);

            let dy = moveDistance * Math.sin(heading);
            let dx = moveDistance * Math.cos(heading);

            this.position.x += dy / 2;
            this.position.y += dy / 2;

            molecules[_indexValue].position.x -= dx / 2
            molecules[_indexValue].position.y -= dy / 2
        }
            if (this.bounce) {

                let dx = this.position.x - molecules[_indexValue].position.x;
                let dy = this.position.y - molecules[_indexValue].position.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                let normalX = dx / dist;
                let normalY = dy / dist;

                let midpointX = (this.position.x.x + molecules[_indexValue].position.x) / 2;
                let midpointY = (this.position.x.y + molecules[_indexValue].position.y) / 2;

                let dVector = (this.velocity.x - molecules[_indexValue].velocity.x) * normalX;
                dVector += (this.velocity.y - molecules[_indexValue].velocity.y) * normalY;

                let dvx = dVector * normalX;
                let dvy = dVector * normalY;

                this.velocity.x -= dvx;
                this.velocity.y -= dvy;
                molecules[_indexValue].velocity.x += dvx;
                molecules[_indexValue].velocity.y += dvy;

                let tempVector = p5.Vector.sub(this.position, molecules[_indexValue].position);
                let heading = tempVector.heading();
                let moveDistance = abs(tempVector.mag() - this.radius - molecules[_indexValue].radius)

                let dxNew = (moveDistance * Math.cos(heading));
                let dyNew =(moveDistance * Math.sin(heading));

                this.position.x += (dxNew / 2);
                molecules[_indexValue].position.x -= (dxNew / 2);

                this.position.y += (dyNew / 2);
                molecules[_indexValue].position.y -= (dyNew / 2);

                
            }
            return true;    
        }
     
    }
    


    reset() {
        this.left = false;
        this.right = false;
        this.top = false;
        this.bottom = false;
        this.intersecting = false;

    }

}


class Healthy extends Molecule{
    constructor(_i){
        super(_i);
        
    }
    render(){
                //noStroke()
                stroke(200, 200, 200);
                strokeWeight(3)
        
                if (this.intersecting) {
                    fill(0, 150, 0, 255);
                }
                else {
                    fill(0, 255, 0, 125);
                }
        
                push()
                translate(this.position.x, this.position.y);
        
                ellipse(0, 0, this.radius * 2, this.radius * 2);
        
                noStroke();
                // fill(255, 255, 255, 255);
                // textSize(30);
                // textAlign(CENTER, CENTER);
                // text(this.arrayPosition, 0, 0);
                pop();

    }

    checkHealth(_indexValue){
        let otherMolecule = molecules[_indexValue];
        if(otherMolecule.constructor.name == "Infector"){
            let randomNum = random();
            if(randomNum < rateOfInfection){
            molecules[this.arrayPosition] = new Infector(this.arrayPosition);
            molecules[this.arrayPosition].position = this.position;
            molecules[this.arrayPosition].velocity = this.velocity;
            molecules[this.arrayPosition].radius = this.radius;
            }
        }
     }
}

class Infector extends Molecule{
    constructor(_i){
        super(_i);
        /**
         * Init is called when the class is created
         */
        this.init()
    }

    /**
     * Function runs, waits 10 seconds (1000ms) and 
     * then runs code inside of setTimeout
     */
    init() {
        setTimeout(() => {
            //code to set recovered
            // let otherMolecule2 = molecules[_indexValue];

            molecules[this.arrayPosition] = new Recovered(this.arrayPosition);
            molecules[this.arrayPosition].position = this.position;
            molecules[this.arrayPosition].velocity = this.velocity;
            molecules[this.arrayPosition].radius = this.radius;

        }, lifeCycle);
    }

    render(){
        //noStroke()
        stroke(200, 200, 200);
        strokeWeight(3)

        if (this.intersecting) {
            fill(150, 0, 0, 255);
        }
        else {
            fill(255, 0, 0, );
        }

        push()
        translate(this.position.x, this.position.y);

        ellipse(0, 0, this.radius * 2, this.radius * 2);

        noStroke();
        // fill(255, 255, 255, 255);
        // textSize(30);
        // textAlign(CENTER, CENTER);
        // text(this.arrayPosition, 0, 0);
        pop();

        }
    checkHealth(_indexValue){
        let otherMolecule = molecules[_indexValue];
        if(otherMolecule.constructor.name == "Healthy"){
            let randomNum = random();
            if(randomNum < rateOfInfection) {
            molecules[otherMolecule.arrayPosition] = new Infector(otherMolecule.arrayPosition);
            molecules[otherMolecule.arrayPosition].position = otherMolecule.position;
            molecules[otherMolecule.arrayPosition].velocity = otherMolecule.velocity;
            molecules[otherMolecule.arrayPosition].radius = otherMolecule.radius;
            }
        }
        
    }


}


class Recovered extends Molecule{
    constructor(_i){
        super(_i);
        
    }

    render(){
        //noStroke()
        stroke(200, 200, 200);
        strokeWeight(3)

        if (this.intersecting) {
            fill(0, 0, 255, 255);
        }
        else {
            fill(0, 0, 100, 125);
        }

        push()
        translate(this.position.x, this.position.y);

        ellipse(0, 0, this.radius * 2, this.radius * 2);

        noStroke();
        // fill(255, 255, 255, 255);
        // textSize(30);
        // textAlign(CENTER, CENTER);
        // text(this.arrayPosition, 0, 0);
        pop();

    }

    checkHealth(_indexValue) {
        console.log('check health')
    }

}