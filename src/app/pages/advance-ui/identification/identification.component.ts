import { Component, OnInit } from '@angular/core';
//import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ModalsComponent } from '../../ui/modals/modals.component';   
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit { 
  breadCrumbItems: { label: string; active?: boolean; }[] = [];

  map: L.Map = {} as L.Map;
  drawingLayer: L.FeatureGroup = {} as L.FeatureGroup;

  constructor(private modalService: NgbModal) {
    this.map = {} as L.Map;
    this.drawingLayer = {} as L.FeatureGroup;
  }

  ngOnInit() {
    this.initializeMap();
    this.initializeDrawing();
  }
 
  initializeMap() {
    const osmTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    const googleTileLayer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
      attribution: 'Google Maps'
    });

    const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '';

    const osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttrib
    });

    this.map = L.map('map', {
      center: new L.LatLng(34.7365314,9.5804517),
      zoom: 6,
     // layers: [osm]
     layers: [osmTileLayer] 
    });
    
   
  }

  initializeDrawing() {
    this.drawingLayer = L.featureGroup().addTo(this.map);
    
    const drawControl = new L.Control.Draw({
      position: 'topleft',
      edit: {
        featureGroup: this.drawingLayer
      },
      draw: {
        polyline: false,
        marker: false,
        polygon: {
          allowIntersection: true,
          drawError: {
            color: '#662d91',
            timeout: 3000
          },
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          },
          showArea: true,
          repeatMode: true,
          metric: true
        },
        rectangle: {
          repeatMode: true,
          metric: true,
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          }
        },
        circle: {
          repeatMode: true,
          metric: true,
          shapeOptions: {
            color: '#662d91',
            weight: 1.5
          }
        }
      }
    });
    // const baseLayers = {
    //   'OpenStreetMap': osmTileLayer,
    //   'Google Maps': googleTileLayer
    // };
    //L.control.layers(this.baseLayers).addTo(this.map);
    this.map.addControl(drawControl);

    this.map.on('draw:created', (event: any) => {
      const layer = event.layer;
      this.drawingLayer.addLayer(layer);
    });
  }
   /**
   * Lunch modal
   * @param content modal Acontent
   */
   LunchModal(content: any) {
    this.modalService.open(content);
  }


     /**
   * Open scroll modal
   * @param scrollDataModal scroll modal data
   */
     scrollModal(scrollDataModal: any) {
      this.modalService.open(scrollDataModal, { scrollable: true });
    }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  /**
   * Open center modal
   * @param centerDataModal center modal data
   */
   centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { centered: true });
  }
  /**
   * Static modal
   * @param StaticDataModal modal content
   */
  StaticModal(StaticDataModal: any) {
    this.modalService.open(StaticDataModal, { centered: true });
  }
    /**
   * Lunch Demo modal
   * @param content modal content
   */
    LunchDemoModal(content: any) {
      this.modalService.open(content);
    }
  

  
}
