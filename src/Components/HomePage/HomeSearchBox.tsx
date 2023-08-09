import { FunctionComponent, useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  SearchBox as HeadlessSearchBox,
  StandaloneSearchBoxOptions,
  buildSearchBox
} from '@coveo/headless';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import EngineContext from '../../common/engineContext';

import { Icon } from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";


interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

const SearchBoxRenderer: FunctionComponent<SearchBoxProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(
    () => controller.subscribe(() => setState(controller.state)),
    [controller]
  );

  const onPressSearchButton = () => {
    controller.submit();
    window.open('/search' + window.location.hash, "_self");
  }


  return (
    <Container >
      <Autocomplete
        inputValue={state.value}
        onInputChange={(_, newInputValue) => {
          controller.updateText(newInputValue);
        }}
        onChange={() => {
          if (controller.state.value !== '') {
            controller.submit();
            window.open('/search' + window.location.hash, "_self");
          }
        }}
        options={state.suggestions.map((suggestion) => suggestion.rawValue)}
        freeSolo
        style={{ width: '100%' }}
        renderInput={(params) => (
          <TextField {...params} className='home-search-box' placeholder="Search" size="small" />
        )}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option, inputValue);
          const parts = parse(option, matches);
          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 400 : 300,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />
      <SearchButton
        type='submit'
        variant="contained"
        onClick={onPressSearchButton}>
        <Icon icon={search} size={24} />
      </SearchButton>
    </Container>
  );
};

const SearchBox = () => {
  const options: StandaloneSearchBoxOptions = { numberOfSuggestions: 8, redirectionUrl: '/search' };
  const engine = useContext(EngineContext)!;
  const controller = buildSearchBox(engine, { options });
  controller.updateText('');

  return <SearchBoxRenderer controller={controller} />;
};

export default SearchBox;


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px 8px;
`

const SearchButton = styled(Button)`
height: 39px;
margin-left: 10px;
`