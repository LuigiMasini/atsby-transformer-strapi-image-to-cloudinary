# gatsby-transformer-strapi-cloudinary-media-bridge

Transform strapi image nodes to cloudinary image nodes, without downloading images.

> __NOTE:__ the images need to be already on cloudinary, we are assuming strapi is using `provider-upload-cloudinary`.

> __NOTE:__ since we are using cloudinary image optimization, we can disable _Responsive friendly upload_ in Media librari in strapi. This will save bandwidth and disk space and keep everything cleaner.

## Installation

```sh
yarn add gatsby-transformer-strapi-cloudinary-media-bridge
```

This plugins also need special version of `gatsby-transform-cloudinary` and optionally of `gatsby-source-strapi`.


### gatsby-transformer-cloudinary


```sh
yarn upgrade gatsby-transformer-cloudinary@beta-v4
```

We are using this beta as it allows [this](https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/pull/163#issuecomment-1163043360) feature.
When it will be released we won't need this beta.


### gatsby-source-strapi

```sh
yarn upgrade @luisinimagigi/gatsby-source-strapi
```

This is not necessary but has the `skipFileDownloads: true` option which will save bandwidth.
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
			resolve: 'gatsby-transformer-cloudinary',
			options: {
				cloudName: process.env.CLOUDINARY_CLOUD_NAME,
				apiKey: process.env.CLOUDINARY_API_KEY,
				apiSecret: process.env.CLOUDINARY_API_SECRET,
				transformTypes:["StrapiCloudinaryBridge"],
			},
		},
		{
			resolve: 'gatsby-transformer-strapi-cloudinary-media-bridge',
			options: {
				cloudName: process.env.CLOUDINARY_CLOUD_NAME,
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
				fluid {
					...CloudinaryAssetFluid
				}
			}
		}
	}
}
```

and use it as

```jsx
<GatsbyImage
	alt={article.cover.alternativeText}
	image={article.cover.childStrapiCloudinaryBridge.fluid}
/>
```
