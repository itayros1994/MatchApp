import React, { Component } from 'react';
import { EventPreview } from './EventPreview';
import InfiniteCarousel from 'react-leaf-carousel';

export class EventListEdit extends Component {
  // state = {
  //   galleryItems: [],
  // };

  // componentDidMount() {
  //   this.setState({ galleryItems: this.props.events });
  // }

  render() {
    // console.log(this.state.galleryItems);
    // if (!this.state.galleryItems.length > 0) return <h1>Loading...</h1>;
    console.log(this.props);
    let numOfEvents = this.props.events.length;
    if (numOfEvents > 5) numOfEvents = 5;
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
                  slidesToShow: numOfEvents - 4 ? numOfEvents - 4 : 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1400,
                settings: {
                  slidesToShow: numOfEvents - 3 ? numOfEvents - 3 : 1,
                  slidesToScroll: 4,
                },
              },
              {
                breakpoint: 1600,
                settings: {
                  slidesToShow: numOfEvents - 2 ? numOfEvents - 2 : 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 2200,
                settings: {
                  slidesToShow: numOfEvents - 1 ? numOfEvents - 1 : 1,
                  slidesToScroll: 1,
                },
              },
            ]}
            swipe={true}
            dots={true}
            showSides={false}
            sideSize={0.5}
            slidesToScroll={1}
            slidesToShow={numOfEvents}
            responsive={true}
            slidesSpacing={10}
          >
            {this.props.events.map((event) => (
              <EventPreview
                key={event._id}
                event={event}
                onRemoveEvent={this.props.onRemoveEvent}
                isEditable={true}
              />
            ))}
          </InfiniteCarousel>
        )}
      </main>
    );
  }
}
