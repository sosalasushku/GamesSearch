import { useAppDispatch, useAppSelector } from '../app/hooks'
import { platforms, categories, sortings } from '../types/types'
import { onChangePlatform, onChangeCategory, onChangeSorting, fetchResults } from '../app/resultsSlice'
import { Select, MenuItem, SelectChangeEvent } from '@mui/material'

const Toolbar = () => {

    const platform = useAppSelector(state => state.results.platform)
    const category = useAppSelector(state => state.results.category)
    const sorting = useAppSelector(state => state.results.sorting)
    const dispatch = useAppDispatch()

    return (
        <div className="toolbar-bg page">
            <div className="container">
                <div className="heading">Search for games!</div>
                <div className="toolbar">
                    <div className="config">
                        <div className="config-item">
                            <div className='select-label'>Platform:</div>
                            <Select name="category" defaultValue={platform} size='small' onChange={(e: SelectChangeEvent) => dispatch(onChangePlatform(e.target.value))}>
                                {
                                    platforms.map(p => <MenuItem value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</MenuItem>)
                                }
                            </Select>
                        </div>
                        <div className="config-item">
                            <div className='select-label'>Category:</div>
                            <Select name="category" defaultValue={category} size='small' onChange={(e: SelectChangeEvent) => dispatch(onChangeCategory(e.target.value))}>
                                {
                                    categories.map(c => <MenuItem value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</MenuItem>)
                                }
                            </Select>
                        </div>
                        <div className="config-item">
                            <div className='select-label'>Sort by:</div>
                            <Select name="sorting" defaultValue={sorting} size='small' onChange={(e: SelectChangeEvent) => dispatch(onChangeSorting(e.target.value))}>
                                {
                                    sortings.map(s => <MenuItem value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)
                                }
                            </Select>
                        </div>
                    </div>
                    <button onClick={() => dispatch(fetchResults())} className='search-btn btn'>Search</button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
