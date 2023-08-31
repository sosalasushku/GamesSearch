import { useAppSelector } from '../app/hooks'
import Toolbar from '../components/Toolbar'
import Results from '../components/Results'
import { ReactComponent as Spinner } from '../media/spinner.svg'

const SearchPage = () => {

    const isLoading = useAppSelector(state => state.results.isLoading)

    return (
        <div className='page'>
            <Toolbar />
            <Results />
            {
                isLoading ? <div className="loading"><Spinner /></div> : ''
            }
        </div>
    )
}

export default SearchPage
