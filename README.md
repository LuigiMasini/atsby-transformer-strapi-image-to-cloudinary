# gatsby-transformer-strapi-cloudinary-media-bridge

Transform strapi image nodes to cloudinary image nodes, without downloading images.

> __NOTE:__ the images need to be already on cloudinary, we are assuming strapi is using `provider-upload-cloudinary`.

> __NOTE:__ since we are using cloudinary image optimization, we can disable _Responsive friendly upload_ in Media Library in Strapi. This will save bandwidth and disk space and keep everything cleaner.

## Installation

```sh
yarn add gatsby-transformer-strapi-cloudinary-media-bridge

#min version required: @3.0.0
yarn upgrade gatsby-transformer-cloudinary

yarn upgrade @luisinimagigi/gatsby-source-strapi
```

The last one is not necessary but has the `skipFileDownloads: true` option which will save bandwidth.
When it will be released we won't need this version.


## Configuration

In `gatsby-config.js` :


```js
module.exports = {
	plugins: [
		// ...
		{
			resolve: '@luisinimagigi/gatsby-source-strapi',
			options: {
				skipFileDownloads: true,
				// your config
			},
		},
		{
			resolve: 'gatsby-transformer-strapi-cloudinary-media-bridge',
			options: {
				cloudName: process.env.CLOUDINARY_CLOUD_NAME,
			},
		},
		{
			resolve: 'gatsby-transformer-cloudinary',
			options: {
				cloudName: process.env.CLOUDINARY_CLOUD_NAME,
				apiKey: process.env.CLOUDINARY_API_KEY,
				apiSecret: process.env.CLOUDINARY_API_SECRET,
				transformTypes:["StrapiCloudinaryBridge"],
			},
		},
	]
}
```

## Usage

In your query you can do

```graphql
query MyQuery {
	strapiArticle {
		cover {
			alternativeText
			childStrapiCloudinaryBridge {
				gatsbyImageData
			}
		}
	}
}
```

and use it as

```jsx
<GatsbyImage
	alt={article.cover.alternativeText}
	image={getImage(article.cover.childStrapiCloudinaryBridge)}
/>
```
