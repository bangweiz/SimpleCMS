import React, {useEffect, useState} from "react";
import {InputGroup} from "../../../components/input-group";
import {useParams} from "react-router";
import {Link, useNavigate } from "react-router-dom";
import {Button, Spin} from "antd";
import styled from "@emotion/styled";
import {DND} from "../../../components/dnd";
import {InfoCard} from "../../../components/info-card";
import {usePage, usePageParams} from "../../../utils/page";
import {Page} from "../../../types/page";
import {useAuth} from "../../../utils/auth";
import {BladeCreate} from "../blade/blade-create";
import {BladeDetail} from "../blade/blade-detail";
import {BladeType} from "../../../types/blade";
import {useBlade} from "../../../utils/blade";
import {removePageError} from "../../../store/page.slice";

export const PageDetail = () => {
    const {pageId} = useParams()
    const navigate = useNavigate()
    const {page, getPage, setBlades, swapBlades, updatePage, createPage, trashPage, error} = usePage()
    const {user} = useAuth()
    const {deleteBlade} = useBlade()
    const {pageData, setPageData, onChange: pageChange} = usePageParams(user?.id || 1)
    const [loading, setLoading] = useState(false)
    const [newBladeVisible, setNewBladeVisible] = useState(false)
    const [order, setOrder] = useState(0)
    const [bladeData, setBladeData] = useState({
        id: 0,
        type: BladeType.NULL
    })

    useEffect(() => {
        if (!pageId) {
            return
        }
        if (!page || page.id !== parseInt(pageId)) {
            getPage(pageId).then((page) => {
                if (!page) {
                    return
                }
                setPageData({
                    url: page.url,
                    title: page.title,
                    status: page.status,
                    userId: page.userId
                })
                let o = 0
                page?.blades.forEach(blade => {
                    o = Math.max(o, blade.order)
                })
                setOrder(o + 1)
            })
        } else {
            setPageData({
                url: page.url,
                title: page.title,
                status: page.status,
                userId: page.userId
            })
            let o = 0
            page?.blades.forEach(blade => {
                o = Math.max(o, blade.order)
            })
            setOrder(o + 1)
        }
    }, [getPage, page, pageId, setPageData])

    const saveOrUpdatePage = async () => {
        removePageError()
        setLoading(true)
        if (pageId) {
            await updatePage(pageData, pageId)
        } else {
            const page = await createPage(pageData)
            navigate(`/admin/pages/${page?.id}`, {replace: true})
        }
        setLoading(false)
    }

    const cancelOrDelete = async () => {
        setLoading(true)
        if (pageId) {
            await trashPage(pageId)
        }
        navigate('/admin/pages', {replace: true})
        setLoading(false)
    }

    const dndChange = (e: {oldIndex: number, newIndex: number}) => {
        const {blades} = (page as Page)
        const {oldIndex, newIndex} = e
        const newBlades = blades.map(blade => ({...blade}))
        const bladesCopy= blades.map(blade => ({...blade}))
        const oldOder = newBlades[oldIndex].order
        newBlades[oldIndex].order = newBlades[newIndex].order
        newBlades[newIndex].order = oldOder
        const temp = newBlades[oldIndex]
        newBlades[oldIndex] = newBlades[newIndex]
        newBlades[newIndex] = temp
        setBlades(newBlades)
        swapBlades({
            id: newBlades[oldIndex].id,
            order: newBlades[oldIndex].order
        }, {
            id: newBlades[newIndex].id,
            order: newBlades[newIndex].order
        }, bladesCopy)
    }

    const onDeleteBlade = (id: number, bladeType: BladeType) => {
        deleteBlade(id, bladeType)
    }

    return (
        <div>
            {loading ? <Spin tip="Saving" /> : (
                <>
                    <RightBox>
                        <Link to="/admin/pages">
                            <Button type="primary">
                                Back to Page List
                            </Button>
                        </Link>
                    </RightBox>
                    <div>
                        <InputGroup
                            label="Page Title:"
                            value={pageData.title}
                            name="title"
                            onChange={pageChange}
                            error={error && error.hasOwnProperty('title') ? error.title : undefined}
                        />
                        <InputGroup
                            label="Page Url:"
                            value={pageData.url}
                            name="url"
                            onChange={pageChange}
                            addonBefore={<label>http://yourdomain.com/</label>}
                            error={error && error.hasOwnProperty('url') ? error.url : undefined}
                        />
                    </div>
                    <div>
                        <h2>
                            <span style={{marginRight: '1rem'}}>Blades</span>
                            <Button type="primary" onClick={() => setNewBladeVisible(true)}>New Blade</Button>
                        </h2>
                        <BladesAndInfoContainer>
                            <BladesContainer>
                                {
                                    page && <DND
                                    items={page.blades}
                                    onChange={dndChange}
                                    onDelete={onDeleteBlade}
                                    setBladeData={setBladeData}
                                    />
                                }
                            </BladesContainer>
                            <InfoContainer>
                                <InfoCard
                                    updateAt={page?.updatedAt || ''}
                                    createAt={page?.createdAt || ''}
                                    status={page?.status || 2}
                                    createBy={page?.user.username || user?.username || ''}
                                    link={page?.url}
                                    saveOrUpdate={saveOrUpdatePage}
                                    cancelOrDelete={cancelOrDelete}
                                    isUpdate={!!pageId}
                                />
                            </InfoContainer>
                        </BladesAndInfoContainer>
                    </div>
                    <BladeCreate
                        isVisible={newBladeVisible}
                        setVisible={setNewBladeVisible}
                        pageId={pageId ? parseInt(pageId) : 0}
                        order={order}
                    />
                    <BladeDetail
                        bladeData={bladeData}
                        setBladeDate={setBladeData}
                    />
                </>
            )}
        </div>
    )
}

const RightBox = styled.div`
  text-align: right;
  margin-bottom: 1.5rem;
`

const BladesAndInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30rem;
  grid-template-areas: "baldes info";
`

const BladesContainer = styled.div`
  grid-area: baldes;
  margin-right: 2rem;
`

const InfoContainer = styled.div`
  grid-area: info;
  margin-top: .7rem;
`