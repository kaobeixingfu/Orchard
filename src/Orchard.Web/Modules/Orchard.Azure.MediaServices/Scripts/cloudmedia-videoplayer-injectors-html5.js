/// <reference path="Typings/jquery.d.ts" />
/// <reference path="Typings/underscore.d.ts" />
/// <reference path="Typings/uri.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Orchard;
(function (Orchard) {
    var Azure;
    (function (Azure) {
        var MediaServices;
        (function (MediaServices) {
            var VideoPlayer;
            (function (VideoPlayer) {
                var Injectors;
                (function (Injectors) {
                    var Html5Injector = (function (_super) {
                        __extends(Html5Injector, _super);
                        function Html5Injector() {
                            _super.apply(this, arguments);
                        }
                        Html5Injector.prototype.isSupported = function () {
                            var videoElement = document.createElement("video");
                            var result = videoElement && !!videoElement.canPlayType;
                            this.debug("Browser supports HTML5 video: {0}", result);
                            this.debug("isSupported() returns {0}.", result);
                            return result;
                        };
                        Html5Injector.prototype.inject = function () {
                            var _this = this;
                            var firstThumbnailAsset = _(this.filteredAssets().ThumbnailAssets).first();
                            this.debug("Injecting player into element '{0}'.", this.container.id);
                            var videoElement = $("<video controls>").attr("width", this.playerWidth).attr("height", this.playerHeight);
                            if (firstThumbnailAsset)
                                videoElement.attr("poster", firstThumbnailAsset.MainFileUrl);
                            if (this.autoPlay)
                                videoElement.attr("autoplay", "");
                            var sourceElements = [];
                            // Adaptive streaming URLs from dynamic assets.
                            _(this.assetData.DynamicVideoAssets).forEach(function (asset) {
                                var smoothStreamingSourceElement = $("<source>").attr("src", asset.SmoothStreamingUrl).attr("type", "application/vnd.ms-sstr+xml");
                                var hlsSourceElement = $("<source>").attr("src", asset.HlsUrl).attr("type", "application/x-mpegURL");
                                var mpegDashSourceElement = $("<source>").attr("src", asset.MpegDashUrl).attr("type", "application/dash+xml");
                                if (_this.applyMediaQueries && asset.MediaQuery)
                                    $([smoothStreamingSourceElement, hlsSourceElement, mpegDashSourceElement]).attr("media", asset.MediaQuery);
                                sourceElements.push(smoothStreamingSourceElement, hlsSourceElement, mpegDashSourceElement);
                            });
                            // "Raw" asset video file URLs from dynamic assets (in decending bitrate order).
                            _(this.assetData.DynamicVideoAssets).forEach(function (asset) {
                                _((asset.EncoderMetadata && asset.EncoderMetadata.AssetFiles) || [])
                                    .filter(function (assetFile) { return _(assetFile.VideoTracks).any(); })
                                    .sort(function (assetFile) { return assetFile.Bitrate; }).reverse()
                                    .forEach(function (assetFile) {
                                    var url = new URI(asset.MainFileUrl).filename(assetFile.Name);
                                    var sourceElement = $("<source>").attr("src", url.toString()).attr("type", assetFile.MimeType);
                                    if (_this.applyMediaQueries && asset.MediaQuery)
                                        sourceElement.attr("media", asset.MediaQuery);
                                    sourceElements.push(sourceElement);
                                });
                            });
                            // Asset file URLs from non-dynamic assets.
                            _(this.assetData.VideoAssets).forEach(function (asset) {
                                var sourceElement = $("<source>").attr("src", asset.MainFileUrl).attr("type", asset.MimeType);
                                if (_this.applyMediaQueries && asset.MediaQuery)
                                    sourceElement.attr("media", asset.MediaQuery);
                                sourceElements.push(sourceElement);
                            });
                            _(this.filteredAssets().SubtitleAssets).forEach(function (asset) {
                                var sourceElement = $("<track kind=\"captions\">").attr("label", asset.Name).attr("src", asset.MainFileUrl).attr("srclang", asset.Language);
                                sourceElements.push(sourceElement);
                            });
                            if (!_(sourceElements).any()) {
                                this.debug("No sources available; cleaning up container and faulting this injector.");
                                this.fault();
                                return;
                            }
                            $(sourceElements).each(function (index, elem) { $(elem).appendTo(videoElement); });
                            videoElement.appendTo(this.container);
                            var lastSource = _(sourceElements).last()[0];
                            var errorHandler = function (e) {
                                _this.debug("Error detected; cleaning up container and faulting this injector.");
                                // TODO: Be a little more selective here, don't fail on any error.
                                _this.fault();
                            };
                            lastSource.addEventListener("error", errorHandler, false);
                            videoElement.on("error", errorHandler);
                        };
                        Html5Injector.prototype.debug = function (message) {
                            var args = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                args[_i - 1] = arguments[_i];
                            }
                            _super.prototype.debug.call(this, "Html5Injector: " + message, args);
                        };
                        return Html5Injector;
                    })(Injectors.Injector);
                    Injectors.Html5Injector = Html5Injector;
                })(Injectors = VideoPlayer.Injectors || (VideoPlayer.Injectors = {}));
            })(VideoPlayer = MediaServices.VideoPlayer || (MediaServices.VideoPlayer = {}));
        })(MediaServices = Azure.MediaServices || (Azure.MediaServices = {}));
    })(Azure = Orchard.Azure || (Orchard.Azure = {}));
})(Orchard || (Orchard = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsb3VkbWVkaWEtdmlkZW9wbGF5ZXItaW5qZWN0b3JzLWh0bWw1LnRzIl0sIm5hbWVzIjpbIk9yY2hhcmQiLCJPcmNoYXJkLkF6dXJlIiwiT3JjaGFyZC5BenVyZS5NZWRpYVNlcnZpY2VzIiwiT3JjaGFyZC5BenVyZS5NZWRpYVNlcnZpY2VzLlZpZGVvUGxheWVyIiwiT3JjaGFyZC5BenVyZS5NZWRpYVNlcnZpY2VzLlZpZGVvUGxheWVyLkluamVjdG9ycyIsIk9yY2hhcmQuQXp1cmUuTWVkaWFTZXJ2aWNlcy5WaWRlb1BsYXllci5JbmplY3RvcnMuSHRtbDVJbmplY3RvciIsIk9yY2hhcmQuQXp1cmUuTWVkaWFTZXJ2aWNlcy5WaWRlb1BsYXllci5JbmplY3RvcnMuSHRtbDVJbmplY3Rvci5jb25zdHJ1Y3RvciIsIk9yY2hhcmQuQXp1cmUuTWVkaWFTZXJ2aWNlcy5WaWRlb1BsYXllci5JbmplY3RvcnMuSHRtbDVJbmplY3Rvci5pc1N1cHBvcnRlZCIsIk9yY2hhcmQuQXp1cmUuTWVkaWFTZXJ2aWNlcy5WaWRlb1BsYXllci5JbmplY3RvcnMuSHRtbDVJbmplY3Rvci5pbmplY3QiLCJPcmNoYXJkLkF6dXJlLk1lZGlhU2VydmljZXMuVmlkZW9QbGF5ZXIuSW5qZWN0b3JzLkh0bWw1SW5qZWN0b3IuZGVidWciXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0QztBQUM1QyxnREFBZ0Q7QUFDaEQseUNBQXlDOzs7Ozs7O0FBRXpDLElBQU8sT0FBTyxDQTBGYjtBQTFGRCxXQUFPLE9BQU87SUFBQ0EsSUFBQUEsS0FBS0EsQ0EwRm5CQTtJQTFGY0EsV0FBQUEsS0FBS0E7UUFBQ0MsSUFBQUEsYUFBYUEsQ0EwRmpDQTtRQTFGb0JBLFdBQUFBLGFBQWFBO1lBQUNDLElBQUFBLFdBQVdBLENBMEY3Q0E7WUExRmtDQSxXQUFBQSxXQUFXQTtnQkFBQ0MsSUFBQUEsU0FBU0EsQ0EwRnZEQTtnQkExRjhDQSxXQUFBQSxTQUFTQSxFQUFDQSxDQUFDQTtvQkFJdERDO3dCQUFt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Q0FBQ0E7NEJBQ2pCQSxDQUFDQSxDQUFDQTs0QkFFRkEsVUFBVUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxFQUFFQSxZQUFZQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDMURBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLE9BQU9BLEVBQUVBLFlBQVlBLENBQUNBLENBQUNBO3dCQUMzQ0EsQ0FBQ0E7d0JBRU1ILDZCQUFLQSxHQUFaQSxVQUFhQSxPQUFlQTs0QkFBRUksY0FBY0E7aUNBQWRBLFdBQWNBLENBQWRBLHNCQUFjQSxDQUFkQSxJQUFjQTtnQ0FBZEEsNkJBQWNBOzs0QkFDeENBLGdCQUFLQSxDQUFDQSxLQUFLQSxZQUFDQSxpQkFBaUJBLEdBQUdBLE9BQU9BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO3dCQUNuREEsQ0FBQ0E7d0JBQ0xKLG9CQUFDQTtvQkFBREEsQ0FyRkFELEFBcUZDQyxFQXJGa0NELGtCQUFRQSxFQXFGMUNBO29CQXJGWUEsdUJBQWFBLGdCQXFGekJBLENBQUFBO2dCQUNMQSxDQUFDQSxFQTFGOENELFNBQVNBLEdBQVRBLHFCQUFTQSxLQUFUQSxxQkFBU0EsUUEwRnZEQTtZQUFEQSxDQUFDQSxFQTFGa0NELFdBQVdBLEdBQVhBLHlCQUFXQSxLQUFYQSx5QkFBV0EsUUEwRjdDQTtRQUFEQSxDQUFDQSxFQTFGb0JELGFBQWFBLEdBQWJBLG1CQUFhQSxLQUFiQSxtQkFBYUEsUUEwRmpDQTtJQUFEQSxDQUFDQSxFQTFGY0QsS0FBS0EsR0FBTEEsYUFBS0EsS0FBTEEsYUFBS0EsUUEwRm5CQTtBQUFEQSxDQUFDQSxFQTFGTSxPQUFPLEtBQVAsT0FBTyxRQTBGYiIsImZpbGUiOiJjbG91ZG1lZGlhLXZpZGVvcGxheWVyLWluamVjdG9ycy1odG1sNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUeXBpbmdzL2pxdWVyeS5kLnRzXCIgLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJUeXBpbmdzL3VuZGVyc2NvcmUuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiVHlwaW5ncy91cmkuZC50c1wiIC8+XG5cbm1vZHVsZSBPcmNoYXJkLkF6dXJlLk1lZGlhU2VydmljZXMuVmlkZW9QbGF5ZXIuSW5qZWN0b3JzIHtcblxuICAgIGltcG9ydCBEYXRhID0gT3JjaGFyZC5BenVyZS5NZWRpYVNlcnZpY2VzLlZpZGVvUGxheWVyLkRhdGE7XG5cbiAgICBleHBvcnQgY2xhc3MgSHRtbDVJbmplY3RvciBleHRlbmRzIEluamVjdG9yIHtcblxuICAgICAgICBwdWJsaWMgaXNTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICB2YXIgdmlkZW9FbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInZpZGVvXCIpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZpZGVvRWxlbWVudCAmJiAhIXZpZGVvRWxlbWVudC5jYW5QbGF5VHlwZTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcoXCJCcm93c2VyIHN1cHBvcnRzIEhUTUw1IHZpZGVvOiB7MH1cIiwgcmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcoXCJpc1N1cHBvcnRlZCgpIHJldHVybnMgezB9LlwiLCByZXN1bHQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluamVjdCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHZhciBmaXJzdFRodW1ibmFpbEFzc2V0ID0gXyh0aGlzLmZpbHRlcmVkQXNzZXRzKCkuVGh1bWJuYWlsQXNzZXRzKS5maXJzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLmRlYnVnKFwiSW5qZWN0aW5nIHBsYXllciBpbnRvIGVsZW1lbnQgJ3swfScuXCIsIHRoaXMuY29udGFpbmVyLmlkKTtcblxuICAgICAgICAgICAgdmFyIHZpZGVvRWxlbWVudCA9ICQoXCI8dmlkZW8gY29udHJvbHM+XCIpLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLnBsYXllcldpZHRoKS5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMucGxheWVySGVpZ2h0KTtcbiAgICAgICAgICAgIGlmIChmaXJzdFRodW1ibmFpbEFzc2V0KVxuICAgICAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hdHRyKFwicG9zdGVyXCIsIGZpcnN0VGh1bWJuYWlsQXNzZXQuTWFpbkZpbGVVcmwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1BsYXkpXG4gICAgICAgICAgICAgICAgdmlkZW9FbGVtZW50LmF0dHIoXCJhdXRvcGxheVwiLCBcIlwiKTtcblxuICAgICAgICAgICAgdmFyIHNvdXJjZUVsZW1lbnRzOiBKUXVlcnlbXSA9IFtdO1xuXG4gICAgICAgICAgICAvLyBBZGFwdGl2ZSBzdHJlYW1pbmcgVVJMcyBmcm9tIGR5bmFtaWMgYXNzZXRzLlxuICAgICAgICAgICAgXyh0aGlzLmFzc2V0RGF0YS5EeW5hbWljVmlkZW9Bc3NldHMpLmZvckVhY2goYXNzZXQgPT4geyAvLyBSZWFkIGZyb20gYXNzZXREYXRhIGJlY2F1c2UgYnJvd3NlciB3aWxsIGRvIG1lZGlhIHF1ZXJ5IGZpbHRlcmluZy5cbiAgICAgICAgICAgICAgICB2YXIgc21vb3RoU3RyZWFtaW5nU291cmNlRWxlbWVudCA9ICQoXCI8c291cmNlPlwiKS5hdHRyKFwic3JjXCIsIGFzc2V0LlNtb290aFN0cmVhbWluZ1VybCkuYXR0cihcInR5cGVcIiwgXCJhcHBsaWNhdGlvbi92bmQubXMtc3N0cit4bWxcIik7XG4gICAgICAgICAgICAgICAgdmFyIGhsc1NvdXJjZUVsZW1lbnQgPSAkKFwiPHNvdXJjZT5cIikuYXR0cihcInNyY1wiLCBhc3NldC5IbHNVcmwpLmF0dHIoXCJ0eXBlXCIsIFwiYXBwbGljYXRpb24veC1tcGVnVVJMXCIpO1xuICAgICAgICAgICAgICAgIHZhciBtcGVnRGFzaFNvdXJjZUVsZW1lbnQgPSAkKFwiPHNvdXJjZT5cIikuYXR0cihcInNyY1wiLCBhc3NldC5NcGVnRGFzaFVybCkuYXR0cihcInR5cGVcIiwgXCJhcHBsaWNhdGlvbi9kYXNoK3htbFwiKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBseU1lZGlhUXVlcmllcyAmJiBhc3NldC5NZWRpYVF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAkKFtzbW9vdGhTdHJlYW1pbmdTb3VyY2VFbGVtZW50LCBobHNTb3VyY2VFbGVtZW50LCBtcGVnRGFzaFNvdXJjZUVsZW1lbnRdKS5hdHRyKFwibWVkaWFcIiwgYXNzZXQuTWVkaWFRdWVyeSk7XG4gICAgICAgICAgICAgICAgc291cmNlRWxlbWVudHMucHVzaChzbW9vdGhTdHJlYW1pbmdTb3VyY2VFbGVtZW50LCBobHNTb3VyY2VFbGVtZW50LCBtcGVnRGFzaFNvdXJjZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFwiUmF3XCIgYXNzZXQgdmlkZW8gZmlsZSBVUkxzIGZyb20gZHluYW1pYyBhc3NldHMgKGluIGRlY2VuZGluZyBiaXRyYXRlIG9yZGVyKS5cbiAgICAgICAgICAgIF8odGhpcy5hc3NldERhdGEuRHluYW1pY1ZpZGVvQXNzZXRzKS5mb3JFYWNoKGFzc2V0ID0+IHsgLy8gUmVhZCBmcm9tIGFzc2V0RGF0YSBiZWNhdXNlIGJyb3dzZXIgd2lsbCBkbyBtZWRpYSBxdWVyeSBmaWx0ZXJpbmcuXG4gICAgICAgICAgICAgICAgXygoYXNzZXQuRW5jb2Rlck1ldGFkYXRhICYmIGFzc2V0LkVuY29kZXJNZXRhZGF0YS5Bc3NldEZpbGVzKSB8fCBbXSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihhc3NldEZpbGUgPT4gXyhhc3NldEZpbGUuVmlkZW9UcmFja3MpLmFueSgpKVxuICAgICAgICAgICAgICAgICAgICAuc29ydChhc3NldEZpbGUgPT4gYXNzZXRGaWxlLkJpdHJhdGUpLnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChhc3NldEZpbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IG5ldyBVUkkoYXNzZXQuTWFpbkZpbGVVcmwpLmZpbGVuYW1lKGFzc2V0RmlsZS5OYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VFbGVtZW50ID0gJChcIjxzb3VyY2U+XCIpLmF0dHIoXCJzcmNcIiwgdXJsLnRvU3RyaW5nKCkpLmF0dHIoXCJ0eXBlXCIsIGFzc2V0RmlsZS5NaW1lVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBseU1lZGlhUXVlcmllcyAmJiBhc3NldC5NZWRpYVF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZUVsZW1lbnQuYXR0cihcIm1lZGlhXCIsIGFzc2V0Lk1lZGlhUXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlRWxlbWVudHMucHVzaChzb3VyY2VFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQXNzZXQgZmlsZSBVUkxzIGZyb20gbm9uLWR5bmFtaWMgYXNzZXRzLlxuICAgICAgICAgICAgXyh0aGlzLmFzc2V0RGF0YS5WaWRlb0Fzc2V0cykuZm9yRWFjaChhc3NldCA9PiB7IC8vIFJlYWQgZnJvbSBhc3NldERhdGEgYmVjYXVzZSBicm93c2VyIHdpbGwgZG8gbWVkaWEgcXVlcnkgZmlsdGVyaW5nLlxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VFbGVtZW50ID0gJChcIjxzb3VyY2U+XCIpLmF0dHIoXCJzcmNcIiwgYXNzZXQuTWFpbkZpbGVVcmwpLmF0dHIoXCJ0eXBlXCIsIGFzc2V0Lk1pbWVUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBseU1lZGlhUXVlcmllcyAmJiBhc3NldC5NZWRpYVF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VFbGVtZW50LmF0dHIoXCJtZWRpYVwiLCBhc3NldC5NZWRpYVF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBzb3VyY2VFbGVtZW50cy5wdXNoKHNvdXJjZUVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8odGhpcy5maWx0ZXJlZEFzc2V0cygpLlN1YnRpdGxlQXNzZXRzKS5mb3JFYWNoKGFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlRWxlbWVudCA9ICQoXCI8dHJhY2sga2luZD1cXFwiY2FwdGlvbnNcXFwiPlwiKS5hdHRyKFwibGFiZWxcIiwgYXNzZXQuTmFtZSkuYXR0cihcInNyY1wiLCBhc3NldC5NYWluRmlsZVVybCkuYXR0cihcInNyY2xhbmdcIiwgYXNzZXQuTGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHNvdXJjZUVsZW1lbnRzLnB1c2goc291cmNlRWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFfKHNvdXJjZUVsZW1lbnRzKS5hbnkoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcoXCJObyBzb3VyY2VzIGF2YWlsYWJsZTsgY2xlYW5pbmcgdXAgY29udGFpbmVyIGFuZCBmYXVsdGluZyB0aGlzIGluamVjdG9yLlwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKHNvdXJjZUVsZW1lbnRzKS5lYWNoKChpbmRleCwgZWxlbSkgPT4geyAkKGVsZW0pLmFwcGVuZFRvKHZpZGVvRWxlbWVudCk7IH0pO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZFRvKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgdmFyIGxhc3RTb3VyY2UgPSA8SFRNTFNvdXJjZUVsZW1lbnQ+Xyhzb3VyY2VFbGVtZW50cykubGFzdCgpWzBdO1xuXG4gICAgICAgICAgICB2YXIgZXJyb3JIYW5kbGVyID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyhcIkVycm9yIGRldGVjdGVkOyBjbGVhbmluZyB1cCBjb250YWluZXIgYW5kIGZhdWx0aW5nIHRoaXMgaW5qZWN0b3IuXCIpO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IEJlIGEgbGl0dGxlIG1vcmUgc2VsZWN0aXZlIGhlcmUsIGRvbid0IGZhaWwgb24gYW55IGVycm9yLlxuICAgICAgICAgICAgICAgIHRoaXMuZmF1bHQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxhc3RTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50Lm9uKFwiZXJyb3JcIiwgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBkZWJ1ZyhtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgICAgICBzdXBlci5kZWJ1ZyhcIkh0bWw1SW5qZWN0b3I6IFwiICsgbWVzc2FnZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59ICJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==