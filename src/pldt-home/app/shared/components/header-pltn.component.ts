import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
    selector: 'pldt-header-pltn',
    templateUrl: 'app/shared/components/header-pltn.component.html'
})
export class HeaderPltnComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {

		var oriClassSegment = "";
		var oriClassMain = "";

		var hdrsegment = document.getElementById('hdrsegment');
		var hdrmain = document.getElementById('hdrmain');

		oriClassSegment = hdrsegment.className;
		oriClassMain = hdrmain.className;

        window.onscroll = function() { myFunction() };

        function myFunction() {
            //get enabled elements

            var scrollposition = (window.scrollY || window.pageYOffset);

            if (scrollposition > 45) {
                if (hdrsegment !== "undefined") {
                    hdrsegment.className += " headeranimate";
                }

                if (hdrmain !== "undefined") {
                    hdrmain.className += " headeranimate";
                }


            } else {
                if (hdrsegment !== "undefined") {
					console.log(oriClassSegment);
                    hdrsegment.className = oriClassSegment;
                }

                if (hdrmain !== "undefined") {
                    hdrmain.className = oriClassMain;
                }
            }
        }
    }

}
