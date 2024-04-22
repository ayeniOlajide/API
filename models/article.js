const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		tags: [String],
		state: {
			type: String,
			default: "draft",
			enum: ["draft", "published"],
		},
		read_count: {
			type: Number,
			default: 0,
		},
		owner: {
			type: String,
		},
		body: {
			type: String,
			required: true,
		},
		reading_time: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

articleSchema.pre("save", function (next) {
	let article = this;

	if (!article.isModified("body")) return next();

	const timeToRead = readingTime(this.body);

	article.reading_time = timeToRead;
	next();
});

articleSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		delete returnedObject.__v;
		delete returnedObject.owner;
	},
});

module.exports = mongoose.model("Article", articleSchema);

