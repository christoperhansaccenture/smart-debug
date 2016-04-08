import {Injectable} from 'angular2/core';
import {LayoutService} from './layout.service';
import {MatchMediaService} from './match-media.service';

@Injectable()
export class HeaderService {

    scroll_start: number;
    scroll_time: number;
	
	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {}
    
    headerOnScroll(){
        
        // var hdrmenuBar;
        // var homeBody;
        // var hdrProfPic;
        
        // hdrmenuBar = document.getElementById('hdrMenu');
        // homeBody = document.getElementById('homeBody');
        // hdrProfPic = document.getElementById('hdrProfPic');
        
        //largeView
        var hdrmenuBarLarge;
        var homeBodyLarge;
        var balanceBodyLarge;
        var planBodyLarge;
        var hdrProfPicLarge;
        
        hdrmenuBarLarge = document.getElementById('hdrMenuLarge');
        homeBodyLarge = document.getElementById('homeBodyLarge');
        hdrProfPicLarge = document.getElementById('hdrProfPicLarge');
        
        //console.log(homeBodyLarge);
        
        var scrollposition = (window.scrollY || window.pageYOffset);
        
        console.log("scrolling: " + scrollposition);
        
            
        if(scrollposition >=250 ){
            
            if(this._matchMediaService.getmm().largeUp){
            
                if(typeof document.getElementById('hdrProfPicLarge')!== undefined && hdrProfPicLarge !== null){
                    
                    hdrProfPicLarge.classList.add("profPicFixed");    
                }
                
                if(typeof document.getElementById('hdrMenuLarge')!== undefined && hdrmenuBarLarge !== null){
                    
                    hdrmenuBarLarge.classList.add("headerFixed");
                }
                
                if(typeof document.getElementById('homeBodyLarge')!== undefined && homeBodyLarge !== null){
                
                    homeBodyLarge.classList.add("bodyFixed");
                    
                }
                
            }

        }
        else{
            
            if(this._matchMediaService.getmm().largeUp){
            
                if(typeof document.getElementById('hdrProfPicLarge') !== undefined && hdrProfPicLarge !== null){
                    
                    hdrProfPicLarge.classList.remove("profPicFixed");    
                }
                
                if(typeof document.getElementById('hdrMenuLarge') !== undefined && hdrmenuBarLarge !== null){
                    
                    hdrmenuBarLarge.classList.remove("headerFixed");
    
                }
            
            }
            
            if(typeof document.getElementById('homeBodyLarge') !== undefined && homeBodyLarge !== null){
            
                homeBodyLarge.classList.remove("bodyFixed");
            }         
            
        }
        
    }


}
