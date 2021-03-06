import React, { Component } from 'react'
import './style/list.css'
import Tab from '../tab/Tab'
import { inject, observer } from 'mobx-react';

@inject('favouriteList', 'playingListStore', 'playStatusStore') @observer
class List extends Component {
    // 歌单id: 319907008
    // /api/search?keywords=海阔天空
    constructor() {
        super()
        this.scrollEl = null
        this.state = {
            id: 319907008
        }
    }

    // 获取列表
    getList = () => {
        this.props.favouriteList.getList('/playlist/detail', 'id=319907008')
    }

    // 向播放页跳转
    toPlay = (id, index) => {
        this.props.playingListStore.updatePlayingList(this.props.favouriteList.store.playlist, this.props.favouriteList.store.listData.result.id)
        this.props.playStatusStore.updatePlayNumber(index)
        this.props.history.push({
            pathname: `play/${id}`
        })
    }

    // 生成歌曲列表html函数
    generateList = () => {
        if (this.props.favouriteList.store.listData.result) {
            return (
                <ul>
                    {this.props.favouriteList.store.listData.result.tracks.map((item, index) => {
                        return (
                            <li 
                                key={item.id} 
                                className="border" 
                                onClick={this.toPlay.bind(this, item.id, index)}>
                                <p>
                                    {index+1}
                                </p>
                                <p className="music_name">
                                    <span>
                                        {item.name}
                                    </span>
                                    <span>
                                        {item.artists[0].name + ' - ' + item.album.name}
                                    </span>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

    componentDidMount() {
        this.getList()
        this.scrollEl.scrollTop = this.props.scrollDis
    }
    componentWillUnmount() {
        if (this.scrollEl) {
            let scrollDis = this.scrollEl.scrollTop
            this.props.favouriteList.saveScrollDis(scrollDis)
        }
    }

    render () {
        return (
            <div className="list">
                <header className="border">
                    {this.props.favouriteList.store.title}
                </header>
                <section ref={el => this.scrollEl = el}>
                     {this.generateList()}
                </section>
                <Tab />
            </div>
        )
    }
}

export default List