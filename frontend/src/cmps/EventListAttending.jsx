import React, { Component } from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import { EventPreviewMyProfile } from './EventPreviewMyProfile';

export class MyAttandings extends Component {
  render() {
    let numOfEvents = this.props.events.length;
    if (numOfEvents > 5) numOfEvents = 5;
    return (
      <main className="upcoming-container-profile">
        {this.props.events.length > 0 && (
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 900,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1600,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              // {
              //   breakpoint: 2200,
              //   settings: {
              //     slidesToShow: numOfEvents - 1 ? numOfEvents - 1 : 1,
              //     slidesToScroll: 1,
              //   },
              // },
            ]}
            swipe={true}
            dots={false}
            showSides={false}
            sideSize={0.5}
            slidesToScroll={1}
            slidesToShow={3}
            responsive={true}
            slidesSpacing={2}
          >
            {this.props.events.map((event) => (
              <EventPreviewMyProfile
                key={event._id}
                event={event}
                onRemoveEvent={this.props.onRemoveEvent}
                isEditable={this.props.isEditable}
              />
            ))}
          </InfiniteCarousel>
        )}
      </main>
    );
  }
}
