# DonutSMP API Documentation

The official DonutSMP API documentation is quite lacking, so I've taken the liberty of rewriting it and building my own renderer using Svelte.

<table>
  <tr>
    <td>
      <img width="1195" height="767" alt="image" src="https://github.com/user-attachments/assets/814eff4b-1df6-4143-b1d0-ecb9e5688e9d" />
    </td>
    <td>
      <img width="1063" height="766" alt="image" src="https://github.com/user-attachments/assets/0b3e1ffc-73ec-4c1b-9209-5ae34cc68816" />
    </td>
  </tr>
</table>

API specifications written as TypeScript interface implementations are rendered using Svelte and Bootstrap.

# Live Documentation
The live site is available at https://donutapi.numenmc.me

# Give me your money
If you like what I do, consider supporting me on [Patreon](https://www.patreon.com/cw/numenmc).

# Build from source
```
git clone https://github.com/numenmc/donut-api-doc.git
cd donut-api-doc
npm install
npm run build
ls dist/
```

# Contributing
Please submit an issue if there is any problem with the documentation. If you want to help write the documentation, please start by checking `/src/specification/specification.ts`. It might be useful to use a code editor that allows you to navigate to variables for easy editing.

### Before submitting a pull request
- Make sure all `description` fields are ended with a full-stop (or period)
- HTML can be used in `description` and `remarks`. Make sure code is correctly marked using `<code></code>` tags
- `remarks` are always rendered as bullet points. Never end bullet point entries with a full-stop (period)
- Make sure you run the `lint:fix` and `format` npm scripts

# Third-Party Notices & Licensing
This project is licensed under MIT. You can view the license [here](https://github.com/numenmc/donut-api-doc/blob/main/LICENSE). Third-party notices are included in the build. You can read them at https://donutapi.numenmc.me/.vite/license.md
