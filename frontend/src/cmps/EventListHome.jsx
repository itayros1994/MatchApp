import React, { Component } from 'react';
import { EventPreview } from './EventPreview';
import InfiniteCarousel from 'react-leaf-carousel';

export class EventListHome extends Component {
  // state = {
  //   galleryItems: [],
  // };

  // componentDidMount() {
  // this.setState({ galleryItems: this.props.events });
  // }

  render() {
    // console.log(this.state.galleryItems);
    // if (!this.state.galleryItems.length > 0) return <h1>Loading...</h1>;
    return (
      <main className="upcoming-container">
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
              // {
              //   breakpoint: 1600,
              //   settings: {
              //     slidesToShow: 4,
              //     slidesToScroll: 4,
              //   },
              // },
              {
                breakpoint: 2200,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
            ]}
            swipe={true}
            dots={false}
            showSides={false}
            sideSize={0.5}
            slidesToScroll={1}
            slidesToShow={5}
            responsive={true}
            slidesSpacing={10}
          >
            {this.props.events.map((event) => (
              <EventPreview
                key={event._id}
                event={event}
                onRemoveEvent={this.props.onRemoveEvent}
              />
            ))}
          </InfiniteCarousel>
        )}
      </main>
    );
  }
}
