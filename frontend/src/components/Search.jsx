import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword]  = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        if (keyword.trim()) {
         navigate(`/search?name=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/home'); // if empty, go to home without search
    }
    }

    return   <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="form-control"
                    // onBlur={searchHandler}
                    placeholder="Enter Product Name ..."
                    onKeyDown={(e) => e.key === "Enter" && searchHandler()}
                />
                <div className="input-group-append">
                    <button onClick={searchHandler} id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
}