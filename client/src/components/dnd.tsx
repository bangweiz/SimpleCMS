import React from "react";
import {List} from "react-movable";
import {Blade, BladeType} from "../types/blade";
import {Button, Popconfirm} from "antd";

export const DND = (props: DNDProps) => {
    const {items, onChange, setBladeData, onDelete} = props

    const onEditClick = (item: Blade) => {
        setBladeData({
            id: item.id,
            type: item.name
        })
    }

    return (
        <List
            values={items}
            onChange={onChange}
            renderList={({ children, props, isDragged }) => (
                <ul
                    {...props}
                    style={{ padding: 0, cursor: isDragged ? 'grabbing' : undefined }}
                >
                    {children}
                </ul>
            )}
            renderItem={({ value, props, isDragged, isSelected }) => (
                <li
                    {...props}
                    style={{
                        ...props.style,
                        padding: '1rem',
                        margin: '0.5em 0em',
                        listStyleType: 'none',
                        cursor: isDragged ? 'grabbing' : 'grab',
                        border: '1px solid #DDD',
                        color: '#333',
                        borderRadius: '.2rem',
                        fontSize: '1.4rem',
                        fontWeight: '600',
                        lineHeight: '3.2rem',
                        backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
                    }}
                >
                    {value.id} {value.name}
                    <div style={{float: "right"}}>
                        <Button onClick={() => onEditClick(value)} type="primary" style={{margin: '0 .5rem'}}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure delete the blade?"
                            onConfirm={() => onDelete(value.id, value.name)}
                        >
                            <Button danger style={{margin: '0 .5rem'}}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                </li>
            )}
        />
    )
}

interface DNDProps {
    items: Blade[]
    onChange: (e: {oldIndex: number, newIndex: number}) => void
    setBladeData: (data: {id: number, type: BladeType}) => void
    onDelete: (id: number, bladeType: BladeType) => void
}
