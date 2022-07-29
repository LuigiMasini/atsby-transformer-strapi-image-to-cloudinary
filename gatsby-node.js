const { set } = require('lodash');

async function onCreateNode ({
	node,
	actions : { createNode, createParentChildLink },
	createNodeId,
	createContentDigest,
	}, config) {

	if (node.internal.type !== `STRAPI__MEDIA`)
		return

	//https://www.npmjs.com/package/gatsby-transformer-cloudinary#use-images-already-on-cloudinary
	//https://github.com/cloudinary-devs/gatsby-transformer-cloudinary/pull/163#issuecomment-1163043360

	const newNode = {
		id: createNodeId(`StrapiCloudinaryBridge-${node.id}`),
		parent:node.id,
		children: [],
		publicId:node.hash,
		cloudName:config.cloudName,
		originalWidth:node.width,
		originalHeight:node.height,
		originalFormat:node.ext?.replace(/.(.*)/i, '$1'),
		cloudinaryAssetData:true,
		internal: {
			type: 'StrapiCloudinaryBridge',
			contentDigest: createContentDigest(`StrapiCloudinaryBridge-${node.internal.contentDigest}-${node.id}`)
		},
	}

	await createNode (newNode, {name: 'gatsby-transformer-strapi-cloudinary-media-bridge'})
	await createParentChildLink({parent:node, child:newNode}, {name: 'gatsby-transformer-strapi-cloudinary-media-bridge'})

}

exports.onCreateNode = onCreateNode
