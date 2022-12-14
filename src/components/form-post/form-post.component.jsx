import { useState, useEffect } from 'react';
import Button from '../../components/button/button.component';

import './form-post.styles.scss';

const FormPost = () => {

  const [categories, setCategories] = useState([]);

  // Use the useState hook to create a state variable for the form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category_id, setCategory_id] = useState('1');

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object and append the image file to it
    const formData = new FormData();

    console.log(image);

    formData.append('image', image);

    // Append the other data to the FormData object
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category_id);

    console.log(formData.get('image'));

    // Make the POST request to the server
    fetch('https://frontend-case-api.sbdev.nl/api/posts', {
      method: 'POST',
      headers: {
        'token': 'pj11daaQRz7zUIH56B9Z',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(() => {
        console.log('new post added');
      });
  };

    // fetch categories from API
    useEffect(()=> {
      fetch('https://frontend-case-api.sbdev.nl/api/categories', {
        headers: {
          'token': 'pj11daaQRz7zUIH56B9Z'}
      })
        .then((res) => res.json())
        .then((categories) => {
          setCategories(categories);
        })
    }, [])

    return (
      <div>
        <h2>Plaats een blog bericht</h2>
        <form onSubmit={handleSubmit}>
          <label>Berichtnaam</label>
          <br />
          <div>
            <input
              className='input-box'
              type="text"
              placeholder="Geen titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <label>Categorie</label>
          <div>
            <select
              className='input-box'
              value={category_id}
              onChange={e => setCategory_id(e.target.value)}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <label>Header afbeelsing</label>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <input
              className='input-box'
              type="file"
              id="image"
              placeholder='Kies bestand'
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/png,image/jpeg">
            </input>
          </div>
          <label>Bericht</label>
          <div>
            <textarea
              className='input-box content-box'
              value={content}
              onChange={(e) => setContent(e.target.value)}>
            </textarea>
          </div>
          <div id='form-button'>
            <Button>Bericht aanmaken</Button>
          </div>
        </form>
      </div>
    )

}

export default FormPost;
