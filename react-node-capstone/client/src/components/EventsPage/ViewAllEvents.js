import React from "react";

class ViewAllEvents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    title: "",
                    start: new Date(),
                    end: new Date(),
                    description: ""
                }
            ]
        };
    }

    // onComponentDidMount() {
    //     fetch("/events/allGlobal")
    //         .then(res => res.json())
    //         .then(eventData =>
    //             this.setState({
    //                 events: eventData.map(event => ({
    //                         title: event.title,
    //                         start: event.start,
    //                         end: event.end,
    //                         description: event.description
    //                     })
    //                 )
    //             }));
    // }

    render() {
        // var {events} = this.state;
        return (
            <div className="viewAll">
                <h4>All Events</h4>
                <hr/>
                <ul>
                    <li>list of global events</li>
                </ul>
            </div>
        );
    }
}

export default ViewAllEvents;