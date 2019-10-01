import React from "react";
import Calendar from "../../components/Calendar/Calendar";

class CalenderView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "attendingEvents": [],
            "createdEvents": []
        };
    }

    componentDidMount() {
        fetch("/events/created", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        })
            .then((res) => {
                try {
                    if (res.success) {
                        console.log(res);
                        let data = [];
                        res.results.forEach(d => {
                            console.log(d);
                            data.push({
                                "start": d.start,
                                "end": d.end,
                                "title": d.title,
                                "color": "white",
                                "backgroundColor": "#880E4F"
                            });
                        });
                        this.setState({"attendingEvents": data});

                    }
                } catch (e) {
                    console.log(e);
                }

                alert(res);
                console.log(res);
                console.log(res.message);
            });

    }


    render() {

        let data = this.state.attendingEvents.concat(this.state.createdEvents);

        return (
            <div className="mdl-grid">
                <Calendar events={data}/>

            </div>
        );
    }
}

export default CalenderView;
