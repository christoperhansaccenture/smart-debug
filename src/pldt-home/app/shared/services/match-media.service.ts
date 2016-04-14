import {Injectable} from 'angular2/core';

@Injectable()
export class MatchMediaService {

	key;
	
    rules = {
            print: "print",
            screen : "screen",
            small : "(max-width: 640px)",
            medium : "(min-width: 640px) and (max-width: 1024px)",
            large : "(min-width: 1024px)",
            xlarge : "(min-width: 1920px)",
            portrait : "(orientation: portrait)",
            landscape : "(orientation: landscape)"
        };
        
    mmqry ={
        	print: false,
            screen : false,
            small : false,
            medium : false,
            large : false,
            xlarge : false,
            portrait : false,
            landscape : false,
            largeUp : false,
            mediumUp : false
        };

    OnResize() {
        // get media query
        for (this.key in this.rules) {
            if (this.rules.hasOwnProperty(this.key)) {
            this.mmqry[this.key] = window.matchMedia(this.rules[this.key]).matches;
            }
        }
        
        if(this.mmqry.large || this.mmqry.xlarge){
            this.mmqry.largeUp = true;
        } else{
            this.mmqry.largeUp = false;
        }
		if(this.mmqry.medium || this.mmqry.large || this.mmqry.xlarge){
            this.mmqry.mediumUp = true;
        } else{
            this.mmqry.mediumUp = false;
        }
    }
    
    getmm(){
        return this.mmqry;
    }

}
