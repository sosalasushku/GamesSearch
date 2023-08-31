import { createSlice, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { GameType, GameInfoType, platformType, categoryType, sortingType } from '../types/types'
import axios from 'axios'

interface ParamsType {
    tag: '3d.mmorpg.fantasy.pvp',
    platform?: string,
    category?: string,
    'sort-by'?: string,
}

interface resultsState  {
    isLoading: boolean,
    isError: boolean,
    results: GameType[],
    resultsInfo: string,
    total: number,
    startIndex: number,
    platform: platformType,
    category: categoryType,
    sorting: sortingType,
    currentGame: number | null,
    currentGameInfo: GameInfoType | null,
    params: ParamsType,
}

const initialState: resultsState = {
    isLoading: false,
    isError: false,
    results: [],
    resultsInfo: '',
    total: 0,
    startIndex: 0,
    platform: 'all',
    category: 'all',
    sorting: 'relevance',
    currentGame: null,
    currentGameInfo: null,
    params: {
        tag: '3d.mmorpg.fantasy.pvp',
    }
}

export const fetchResults = createAsyncThunk(
    'results_state/fetchResults',
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as RootState
        const response = await axios.request({
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
            params: state.results.params,
            headers: {
                'X-RapidAPI-Key': '835bccec08mshd0cd3568799e879p109ec1jsncb85c6226063',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
            }
        });
        if (!response) {
            return thunkAPI.rejectWithValue('Error')
        }
        return await response
    }
)

export const getGameInfo = createAsyncThunk(
    'results_state/getGameInfo',
    async function (id: number, thunkAPI) {
        const state = thunkAPI.getState() as RootState
        const response = await axios.request({
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: {id: id},
            headers: {
                'X-RapidAPI-Key': '835bccec08mshd0cd3568799e879p109ec1jsncb85c6226063',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
                'Access-Control-Max-Age': '300',
                'Cache-Control': 'max-age=300',
            }
        });
        if (!response) return thunkAPI.rejectWithValue('Error')
        return await response
    }
)

export const resultsSlice = createSlice({
    name: 'results_state',
    initialState,
    reducers: {
        onChangePlatform: (state, action) => {
            state.platform = action.payload
            if (state.platform === 'all' && 'platform' in state.params) {
                delete state.params.platform
            } else {
                state.params.platform = state.platform
            }
        },
        onChangeCategory: (state, action) => {
            state.category = action.payload
            if (state.category === 'all' && 'category' in state.params) {
                delete state.params.category
            } else {
                state.params.category = state.category
            }
        },
        onChangeSorting: (state, action) => {
            state.sorting = action.payload
            state.params['sort-by'] = state.sorting
        },
        setCurrentGame: (state, action) => {
            state.currentGame = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.resultsInfo = ''
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.results = action.payload.data
                    console.log(state.results)
                } else {
                    state.resultsInfo = `No results found.`
                }
            })
            .addCase(getGameInfo.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.resultsInfo = ''
            })
            .addCase(getGameInfo.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.currentGameInfo = action.payload.data
                    console.log(state.currentGameInfo)
                } else {
                    state.resultsInfo = `No results found.`
                }
            })
            .addMatcher(isError, (state) => {
                state.isLoading = false
                state.isError = true
                state.resultsInfo = 'Error'
            })
    }
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const { onChangePlatform, onChangeCategory, onChangeSorting, setCurrentGame } = resultsSlice.actions

export default resultsSlice.reducer