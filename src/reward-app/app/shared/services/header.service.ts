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
        
        var hdrmenuBar;
        var homeBody;
        var hdrProfPic;
        
        hdrmenuBar = document.getElementById('hdrMenu');
        homeBody = document.getElementById('homeBody');
        hdrProfPic = document.getElementById('hdrProfPic');
        
        //largeView
        var hdrmenuBarLarge;
        var homeBodyLarge;
        var balanceBodyLarge;
        var planBodyLarge;
        var hdrProfPicLarge;
        
        hdrmenuBarLarge = document.getElementById('hdrMenuLarge');
        homeBodyLarge = document.getElementById('homeBodyLarge');
        balanceBodyLarge = document.getElementById('balanceBodyLarge');
        planBodyLarge = document.getElementById('planBodyLarge');
        hdrProfPicLarge = document.getElementById('hdrProfPicLarge');
        
        var scrollposition = (window.scrollY || window.pageYOffset);
        
        //console.log("scrolling: " + scrollposition);
        
        if(!this._matchMediaService.getmm().mediumUp && !this._matchMediaService.getmm().largeUp){
            if(scrollposition > 90 ){

                
                if(typeof document.getElementById('hdrProfPic')!== undefined && hdrProfPic.length !== 0){
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrProfPic.classList.add("profPicFixed");    
                    }
                }
                
                if(typeof document.getElementById('hdrMenu')!== undefined && hdrmenuBar.length !== 0){
                    
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrmenuBar.classList.add("headerFixed");
                    }
                }
                
                if(this._layoutService.currentPage === 'MySmart'){
                    if(typeof document.getElementById('homeBody')!== undefined && homeBody.length !== 0){
                        
                        homeBody.classList.add("bodyFixed");
                    }
                }

            }
            else{
                
                if(typeof document.getElementById('hdrProfPic')!== undefined && hdrProfPic.length !== 0){
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrProfPic.classList.remove("profPicFixed");    
                    }
                }
                
                 if(typeof document.getElementById('hdrMenu') !== undefined && hdrmenuBar.length !== 0){
                    
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrmenuBar.classList.remove("headerFixed");
                    }
    
                }
                
                if(this._layoutService.currentPage === 'MySmart'){
                    if(typeof document.getElementById('homeBody')!== undefined && homeBody.length !== 0){
                        
                        homeBody.classList.remove("bodyFixed");
                        
                    }
                }
            }  
            
        }
        else if(this._matchMediaService.getmm().mediumUp && !this._matchMediaService.getmm().largeUp){
            if(scrollposition > 200 ){

                
                if(typeof document.getElementById('hdrProfPic')!== undefined && hdrProfPic.length !== 0){
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrProfPic.classList.add("profPicFixed");    
                    }
                }
                
                if(typeof document.getElementById('hdrMenu')!== undefined && hdrmenuBar.length !== 0){
                    
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrmenuBar.classList.add("headerFixedMedium");
                    }
                }
                
                // if(typeof document.getElementById('homeBody')!== undefined && homeBody.length !== 0){
                    
                //     if(this._layoutService.currentPage === 'MySmart'){
                //         homeBody.classList.add("bodyFixedMedium");
                //     }
                // }


            }
            else{
                
                if(typeof document.getElementById('hdrProfPic')!== undefined && hdrProfPic.length !== 0){
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrProfPic.classList.remove("profPicFixed");    
                    }
                }
                
                 if(typeof document.getElementById('hdrMenu') !== undefined && hdrmenuBar.length !== 0){
                    
                    if(this._layoutService.currentPage === 'MySmart'){
                        hdrmenuBar.classList.remove("headerFixedMedium");
                    }
    
                }
                
                // if(typeof document.getElementById('homeBody')!== undefined && homeBody.length !== 0){
                    
                //     if(this._layoutService.currentPage === 'MySmart'){
                //         homeBody.classList.remove("bodyFixedMedium");
                //     }
                // }

            } 
        }
        else if(this._matchMediaService.getmm().largeUp){
            
            if(scrollposition > 250 ){
                
                if(typeof document.getElementById('hdrProfPicLarge')!== undefined && hdrProfPicLarge.length !== 0){
                    
                    hdrProfPicLarge.classList.add("profPicFixed");    
                }
                
                if(typeof document.getElementById('hdrMenuLarge')!== undefined && hdrmenuBarLarge.length !== 0){
                    
                    hdrmenuBarLarge.classList.add("headerFixed");
                }
                
                if(this._layoutService.currentPage === 'MySmart'){
                    
                    if(typeof document.getElementById('homeBodyLarge')!== undefined && homeBodyLarge.length !== 0){
                    
                        homeBodyLarge.classList.add("bodyFixed");
                        
                    }
                }
                
                
                if(this._layoutService.currentPage === 'Balance'){
                    if(typeof document.getElementById('balanceBodyLarge')!== undefined && balanceBodyLarge.length !== 0){
                        balanceBodyLarge.classList.add("bodyFixed");
                    }
                }
                
                if(this._layoutService.currentPage === 'Plan'){
                    
                    if(typeof document.getElementById('planBodyLarge')!== undefined && planBodyLarge.length !== 0){
                        planBodyLarge.classList.add("bodyFixed");
                    }
                    
                }


            }
            else{
                
                if(typeof document.getElementById('hdrProfPicLarge') !== undefined && hdrProfPicLarge.length !== 0){
                    
                    hdrProfPicLarge.classList.remove("profPicFixed");    
                }
                
                 if(typeof document.getElementById('hdrMenuLarge') !== undefined && hdrmenuBarLarge.length !== 0){
                    
                    hdrmenuBarLarge.classList.remove("headerFixed");
    
                }
                
                if(this._layoutService.currentPage === 'MySmart'){
                    if(typeof document.getElementById('homeBodyLarge') !== undefined && homeBodyLarge.length !== 0){
                    
                        homeBodyLarge.classList.remove("bodyFixed");
                    }
                }         
       
                
                if(this._layoutService.currentPage === 'Balance'){
                    if(typeof document.getElementById('balanceBodyLarge') !== undefined && balanceBodyLarge.length !== 0){
                        
                            balanceBodyLarge.classList.remove("bodyFixed");
                    }    
                }
                
                if(this._layoutService.currentPage === 'Plan'){
                    if(typeof document.getElementById('planBodyLarge')!== undefined && planBodyLarge.length !== 0){
                        
                        planBodyLarge.classList.remove("bodyFixed");
                    }    
                }

            }
            
        }
        
    }


}
