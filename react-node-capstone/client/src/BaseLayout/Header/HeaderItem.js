
import React from 'react';
import { Link } from 'react-router-dom';



class HeaderItem extends React.Component {

    constructor(props) {
        super(props);

        this.SubMenu = this.SubMenu.bind(this);
    }

    SubMenu(items) {
        if (items == null || items.length === 0) {
            return "";
        }
        items.map(item => {
            return (<Link className="nav-link-2" to={item.to}><li className="mdl-color-text--white"><i className="material-icons">{item.icon}</i>{item.title}</li></Link>);
        });
    }

    render() {
        return (
            <div>
                <Link className="nav-link" to={this.props.to}>
                    <div><i className="drawer-icons material-icons mdl-color-text--white">{this.props.icon}</i><span className="drawer-text">{this.props.title}</span></div>
                </Link>

                <div className="nav-sub-link">
                    {this.SubMenu(this.props.subItems)} 
                </div>
            </div>
            
        );
    }
}

export default HeaderItem;








