import {Injectable} from 'angular2/core';
import {LayoutService} from './layout.service';

@Injectable()
export class HeaderService {

    scroll_start: number;
    scroll_time: number;
	
	constructor (private _layoutService: LayoutService) {}
    
    headerOnScroll(){
        

        var hdrsearch;
        var hdrmain;
        var hdrsub;
        
        hdrmain = document.getElementById('hdrmain');
        hdrsub = document.getElementById('hdrsub');
        hdrsearch = document.getElementById('hdrsearch');
        
        //console.log(homeBodyLarge);
        
        var scrollposition = (window.scrollY || window.pageYOffset);
        
        //console.log("scrolling: " + scrollposition);
        
            
        if(scrollposition > 45 ){
                
                if(typeof document.getElementById('hdrmain')!== undefined && hdrmain !== null){
                    
                    hdrmain.classList.add("headeranimate");
                }
                
                if(typeof document.getElementById('hdrsub')!== undefined && hdrsub !== null){
                    
                    hdrsub.classList.add("headeranimate");
                }
                
                if(typeof document.getElementById('hdrsearch')!== undefined && hdrsearch !== null){
                    
                    hdrsearch.classList.add("headeranimate");
                }

        }
        else{
                
                if(typeof document.getElementById('hdrmain') !== undefined && hdrmain !== null){
                    
                    hdrmain.classList.remove("headeranimate");
    
                }
                
                if(typeof document.getElementById('hdrsub')!== undefined && hdrsub !== null){
                    
                    hdrsub.classList.remove("headeranimate");
                }
                
                if(typeof document.getElementById('hdrsearch')!== undefined && hdrsearch !== null){
                    
                    hdrsearch.classList.remove("headeranimate");
                }        
            
        }
        
    }


}
