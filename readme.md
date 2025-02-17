## file system router

### usage in your app:

```jsx
// App.jsx
import { BrowserRouter as Router } from 'react-router-dom'
import { FileSystemRouter } from 'file-system-router'

// vite users:
const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })

// webpack users:
// const pages = require.context('./pages', true, /\.jsx$/)

export default function App() {
  return (
    <Router>
      <FileSystemRouter pages={pages} />
    </Router>
  )
}
```

### file structure convention :

```
pages/
  index.jsx           -> /
  about.jsx           -> /about
  blog/
    index.jsx         -> /blog
    [id].jsx          -> /blog/:id
  projects/
    [...slug].jsx     -> /projects/*
```

### features :

1. automatically converts files to routes
2. supports dynamic parameters with `[param].jsx`
3. supports catch all routes with `[...slug].jsx`
4. handles index routes with `index.jsx`

### for your page components :

```jsx
// pages/blog/[id].jsx
import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()
  return <div>blog post : {id}</div>
}

// pages/projects/[...slug].jsx
import { useParams } from 'react-router-dom'

export default function Projects() {
  const { slug } = useParams()
  const parts = slug?.split('/') || []
  return <div>project parts : {parts.join(', ')}</div>
}
```