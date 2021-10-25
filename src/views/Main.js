import React, { useState, useEffect } from 'react';
import { AddButton } from "../components/AddButton";
import { Spinner } from '../components/Spinner';
import { Grid } from "../components/Grid";
import { ItemDetailsView } from "./ItemDetailsView";
import { ItemSettingsView } from "./ItemSettingsView";
import { useQuery, useMutation } from "react-apollo";
import { getItemsQuery } from '../graphql/getItems';
import { deleteItemMutation } from "../graphql/deleteItem";
import { StyledMain, SearchContainer } from './Styled';

export const Main = () => {
    const {data, loading, error} = useQuery(getItemsQuery);
    const [deleteMutation] = useMutation(deleteItemMutation, {
        awaitRefetchQueries: true,
        refetchQueries: [{
            query: getItemsQuery
        }]
    });

    const [detailedViewIsOpened, setDetailedView] = useState(false);
    const [activeItemId, setActiveItemId] = useState(null);
    const [addViewIsOpened, setAddView] = useState(false);
    const [images, setImages] =  useState([])
    const [list, setList] = useState([]);
    const [query, setQuery] =  useState('')


    const onImageClick = id => () => {
        setActiveItemId(id);
        setDetailedView(true);
    };

    const onCloseClick = () => setDetailedView(false);
    const onAddViewClose = () => setAddView(false);
    const onAddButtonClick = () => setAddView(true);

    useEffect(()=>{

       if (data) {
        let v = Object.values([...data.items])
        setImages(v)
       }

    },[data])

    const onRemoveClick = id => () => {
        setDetailedView(false);
        deleteMutation({variables: { id }});
    };

    if (loading || error) {
        return <Spinner/>;
    }


    function filterItems(arr, query) {
        return arr.filter(function(el) {
        return el.tooltip.text.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
      }

    const handleFilter = (query ) => {
        setQuery(query)
        const items = filterItems(images, query);
        setList(items)
    }

    return (
        <StyledMain>
            <Grid data={query ? list : images} onImageClick={onImageClick}/>
            <SearchContainer>
                <input onChange={(e)=> handleFilter(e.target.value)} placeholder="Search for dog.." />
            </SearchContainer>
            <AddButton update onClick={onAddButtonClick}>+</AddButton>

            { detailedViewIsOpened &&
                <ItemDetailsView
                    id={activeItemId}
                    onRemoveClick={onRemoveClick}
                    setDetailedView={setDetailedView}
                    onCloseClick={onCloseClick}
                />
            }
          
            { addViewIsOpened &&
                <ItemSettingsView onCloseClick={onAddViewClose} /> }
        </StyledMain>
    )
};
