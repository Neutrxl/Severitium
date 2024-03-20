# Additional

There are saved additional functions that can be used for some unique actions.

## Get Season function

It works using current date ```new Date().getMonth() + 1``` to detect current month.

### Usage

```js
_getSeason();
```

### Output

It returns the name of the current season: spring/summer/autumn/winter.

# Image to Base64

Takes URL to the image and converts it to Base64 Data URI.

### Warning

The function doesn't work in Tampermonkey.

### Usage

```js
imageToBase64(imageUrl, function (base64Image) {
	console.log(base64Image);
});
```

### Description

Creates canvas to draw image there. When the image is fully loaded it converts the image into Base64 Data URI in callback function argument.