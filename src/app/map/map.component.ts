import { Component, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
    constructor() {}

    async ngAfterViewInit(): Promise<void> {
        const zoom = d3
            .zoom()
            .scaleExtent([1, 20000])
            .translateExtent([[0, 0], [3366, 2382]]) // Obtained from: g.node().getBBox();
            .on('zoom', () => {
                if (g) {
                    // console.log(g.node().getBBox());
                    g.attr('transform', d3.event.transform);
                }
            });

        const svg = d3
            .select('#canvas')
            .append('svg')
            .attr('width', '100vw')
            .attr('height', '100vh')
            .call(zoom);

        const g = svg.append('g');

        g.append('image').attr('href', 'assets/images/tube-map.svg');

        const zoomIn = d3.select('#zoom-in');

        zoomIn.on('click', function() {
            zoom.scaleBy(svg.transition().duration(750), 1.3);
        });
    }
}
