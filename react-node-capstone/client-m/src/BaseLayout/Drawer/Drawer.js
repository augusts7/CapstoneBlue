
import React from 'react';
import DrawerItem from "./DrawerItem/DrawerItem";
import DrawerHeader from "./DrawerHeader/DrawerHeader";

import "./Drawer.css";



class Drawer extends React.Component {

    constructor(props) {
        super(props);

        this.MenuItem = this.MenuItem.bind(this);
        this.SubMenuItem = this.SubMenuItem.bind(this);
        this.GetDrawerItem = this.GetDrawerItem.bind(this);
    } 

    MenuItem(link, icon, title, subItems) {
        return { "Link": link, "Icon": icon, "Title": title, "SubItems": subItems }; 
    }

    SubMenuItem(link, icon, title) {
        return { "Link": link, "Icon": icon, "Title": title };
    }

    GetDrawerItem(item) {
        return <DrawerItem Link={item.Link} Title={item.Title} Icon={item.Icon} SubItems={item.SubItems} />;
    }

    render() {

        let menuItems = [
            this.MenuItem("", "assessment", "TimeSlots", [
                this.SubMenuItem("", "list", "View All", ""),
                this.SubMenuItem("", "add", "Add")
            ]),
            this.MenuItem("", "assessment", "Appointments", [
                this.SubMenuItem("", "list", "View All"),
                this.SubMenuItem("", "add", "Add")
            ]),
            this.MenuItem("", "announcement", "Admin")
        ];

        return (
            <div className="mdl-layout__drawer">

                <span class="mdl-layout-title drawer-title">ULM</span>

                <nav className="mdl-navigation">

                    {menuItems.map(item => {
                        return this.GetDrawerItem(item);
                    })}

                    <div className="mdl-layout-spacer"></div>

                    <DrawerItem Link="" Title="Suggestions" Icon="donut_small" SubItems="" />
                  

                </nav>

            </div>
        );
    }
}

export default Drawer;








