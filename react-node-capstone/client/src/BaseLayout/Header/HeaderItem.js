
import React from 'react';



class HeaderItem extends React.Component {

    constructor(props) {
        super(props);

        this.SubMenu = this.SubMenu.bind(this);
    }

    SubMenu(items) {
        if (items == null || items.length == 0) {
            return "";
        }
        items.map(item => {
            return (<a className="nav-link-2" href={item.Link}><li className="mdl-color-text--white"><i className="material-icons">{item.Icon}</i>{item.Title}</li></a>);
        });
    }

    render() {
        return (
            <div>
                <a className="nav-link" href={this.props.Link}>
                    <div><i className="drawer-icons material-icons mdl-color-text--white">{this.props.Icon}</i><span className="drawer-text">{this.props.Title}</span></div>
                </a>

                <div className="nav-sub-link">
                    {this.SubMenu(this.props.SubItems)} 
                </div>
            </div>
            
        );
    }
}

export default HeaderItem;








