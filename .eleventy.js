const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("src/icons");
  eleventyConfig.addPassthroughCopy("src/js");

  const { DateTime } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("dd-MM-yy");
  });

  // TODO: Shortcodes with a img tag has separate logic lines to img optimize eventhough the
  // code is almost same. DRY the code for a single image opt function

  // images
  eleventyConfig.addNunjucksAsyncShortcode(
    "responsiveimage",
    async (src, alt = "image", sizes = "100vw", classes, banner = false) => {
      if (banner) {
        src = `./src/images/${src}`;
        alt = `${alt} circle banner`;
      }

      let metadata = await Image(src, {
        widths: banner ? [1280] : [250],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
      });

      let lowsrc = metadata.jpeg[0];

      return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
        <img
          src="${lowsrc.url}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt="${alt}"
          class="${classes}">
      </picture>`;
    }
  );

  // slideshow
  eleventyConfig.addNunjucksAsyncShortcode(
    "slide",
    async (src, alt = "image") => {
      src = `./src/images/slideshow/${src}`;

      let metadata = await Image(src, {
        widths: [1280],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
      });

      let lowsrc = metadata.jpeg[0];

      return `<picture class="carousel-content absolute h-screen transition-opacity duration-500 ease-linear">
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(", ")}" sizes="100vw">`;
        })
        .join("\n")}
        <img
          src="${lowsrc.url}"
          alt="${alt}"
          class="h-full object-cover w-screen">
      </picture>`;
    }
  );

  // portrait card
  eleventyConfig.addNunjucksAsyncShortcode(
    "person",
    async (name, circle, role, imgsrc) => {
      imgsrc = `./src/images/${circle}/${imgsrc}`;

      let metadata = await Image(imgsrc, {
        widths: [300],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
      });

      let lowsrc = metadata.jpeg[0];

      return `
    <span class="flex flex-col items-center justify-center w-48 py-2 text-center">
      <picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `<source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat.map((entry) => entry.srcset).join(", ")}" >`;
        })
        .join("\n")}
        <img
          src="${lowsrc.url}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt=""
          class="w-32 h-32 object-cover rounded-full">
      </picture>
      <h3 class="mt-4">${role}</h3>
      <h2 class="text-lg leading-none">${name}</h2>
    </span>
    `;
    }
  );

  // circle card
  eleventyConfig.addNunjucksAsyncShortcode(
    "circle",
    async (circle, link, imgsrc) => {
      imgsrc = `./src/images/${imgsrc}`;

      let metadata = await Image(imgsrc, {
        widths: [300],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
      });

      let lowsrc = metadata.jpeg[0];

      return `
    <span class="flex flex-col items-center justify-center w-48 py-2 text-center cursor-pointer" onclick="window.location.href = '/${link}'">
      <picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `<source type="image/${
            imageFormat[0].format
          }" srcset="${imageFormat.map((entry) => entry.srcset).join(", ")}" >`;
        })
        .join("\n")}
        <img
          src="${lowsrc.url}"
          width="${lowsrc.width}"
          height="${lowsrc.height}"
          alt=""
          class="w-32 h-32 object-cover rounded-full">
      </picture>
      <h2 class="mt-4 text-lg leading-none">${circle}</h2>
    </span>
    `;
    }
  );

  return {
    dir: { input: "src", output: "_site" },
  };
};
