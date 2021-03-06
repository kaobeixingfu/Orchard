/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

/// <reference path="Typings/jquery.d.ts" />
var Orchard;
(function (Orchard) {
    var Azure;
    (function (Azure) {
        var MediaServices;
        (function (MediaServices) {
            var AutoRefresh;
            (function (AutoRefresh) {
                // Periodically refresh elements.
                $(function () {
                    $("[data-refresh-url]").each(function () {
                        var self = $(this);
                        var update = function () {
                            var container = self;
                            var url = container.data("refresh-url");
                            $.ajax({
                                url: url,
                                cache: false
                            }).then(function (html) {
                                container.html(html);
                                setTimeout(update, 5000);
                            });
                        };
                        setTimeout(update, 5000);
                    });
                });
            })(AutoRefresh = MediaServices.AutoRefresh || (MediaServices.AutoRefresh = {}));
        })(MediaServices = Azure.MediaServices || (Azure.MediaServices = {}));
    })(Azure = Orchard.Azure || (Orchard.Azure = {}));
})(Orchard || (Orchard = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsb3VkbWVkaWEtYXV0b3JlZnJlc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBNEM7QUFFNUMsSUFBTyxPQUFPLENBcUJiO0FBckJELFdBQU8sT0FBTztJQUFDLElBQUEsS0FBSyxDQXFCbkI7SUFyQmMsV0FBQSxLQUFLO1FBQUMsSUFBQSxhQUFhLENBcUJqQztRQXJCb0IsV0FBQSxhQUFhO1lBQUMsSUFBQSxXQUFXLENBcUI3QztZQXJCa0MsV0FBQSxXQUFXO2dCQUMxQyxpQ0FBaUM7Z0JBQ2pDLENBQUMsQ0FBQztvQkFDRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3pCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxNQUFNLEdBQUc7NEJBQ1QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNyQixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUV4QyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNILEdBQUcsRUFBRSxHQUFHO2dDQUNSLEtBQUssRUFBRSxLQUFLOzZCQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dDQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3JCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQzdCLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQzt3QkFFRixVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFyQmtDLFdBQVcsR0FBWCx5QkFBVyxLQUFYLHlCQUFXLFFBcUI3QztRQUFELENBQUMsRUFyQm9CLGFBQWEsR0FBYixtQkFBYSxLQUFiLG1CQUFhLFFBcUJqQztJQUFELENBQUMsRUFyQmMsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBcUJuQjtBQUFELENBQUMsRUFyQk0sT0FBTyxLQUFQLE9BQU8sUUFxQmIiLCJmaWxlIjoiY2xvdWRtZWRpYS1hdXRvcmVmcmVzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUeXBpbmdzL2pxdWVyeS5kLnRzXCIgLz5cclxuXHJcbm1vZHVsZSBPcmNoYXJkLkF6dXJlLk1lZGlhU2VydmljZXMuQXV0b1JlZnJlc2gge1xyXG4gICAgLy8gUGVyaW9kaWNhbGx5IHJlZnJlc2ggZWxlbWVudHMuXHJcbiAgICAkKCgpID0+IHtcclxuICAgICAgICAkKFwiW2RhdGEtcmVmcmVzaC11cmxdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gc2VsZjtcclxuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBjb250YWluZXIuZGF0YShcInJlZnJlc2gtdXJsXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGh0bWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodXBkYXRlLCA1MDAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCh1cGRhdGUsIDUwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0iXX0=
