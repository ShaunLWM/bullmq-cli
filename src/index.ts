import blessed from "blessed";

var WIDTH_LEFT_PANEL = 30;
var DEFAULT_PADDING = {
  top: 0,
  left: 1,
  right: 1,
};

function setup() {
  this.screen = blessed.screen({
    smartCSR: true,
    fullUnicode: true,
  });
  this.screen.title = "PM2 Dashboard";

  this.logLines = {};

  this.list = blessed.list({
    top: "0",
    left: "0",
    width: WIDTH_LEFT_PANEL + "%",
    height: "70%",
    padding: 0,
    scrollbar: {
      ch: " ",
      inverse: false,
    },
    border: {
      type: "line",
    },
    keys: true,
    autoCommandKeys: true,
    tags: true,
    style: {
      selected: {
        bg: "blue",
        fg: "white",
      },
      scrollbar: {
        bg: "blue",
        fg: "black",
      },
      fg: "white",
      border: {
        fg: "blue",
      },
      header: {
        fg: "blue",
      },
    },
  });

  this.list.on("select item", (item, i) => {
    this.logBox.clearItems();
  });

  this.logBox = blessed.list({
    label: " Logs ",
    top: "0",
    left: WIDTH_LEFT_PANEL + "%",
    width: 100 - WIDTH_LEFT_PANEL + "%",
    height: "70%",
    padding: DEFAULT_PADDING,
    scrollable: true,
    scrollbar: {
      ch: " ",
      inverse: false,
    },
    keys: true,
    autoCommandKeys: true,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      fg: "white",
      border: {
        fg: "white",
      },
      scrollbar: {
        bg: "blue",
        fg: "black",
      },
    },
  });

  this.metadataBox = blessed.box({
    label: " Metadata ",
    top: "70%",
    left: WIDTH_LEFT_PANEL + "%",
    width: 100 - WIDTH_LEFT_PANEL + "%",
    height: "26%",
    padding: DEFAULT_PADDING,
    scrollable: true,
    scrollbar: {
      ch: " ",
      inverse: false,
    },
    keys: true,
    autoCommandKeys: true,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      fg: "white",
      border: {
        fg: "white",
      },
      scrollbar: {
        bg: "blue",
        fg: "black",
      },
    },
  });

  this.metricsBox = blessed.list({
    label: " Custom Metrics ",
    top: "70%",
    left: "0%",
    width: WIDTH_LEFT_PANEL + "%",
    height: "26%",
    padding: DEFAULT_PADDING,
    scrollbar: {
      ch: " ",
      inverse: false,
    },
    keys: true,
    autoCommandKeys: true,
    tags: true,
    border: {
      type: "line",
    },
    style: {
      fg: "white",
      border: {
        fg: "white",
      },
      scrollbar: {
        bg: "blue",
        fg: "black",
      },
    },
  });

  this.box4 = blessed.text({
    content:
      " left/right: switch boards | up/down/mouse: scroll | Ctrl-C: exit{|} {cyan-fg}{bold}To go further check out https://pm2.io/{/}  ",
    left: "0%",
    top: "95%",
    width: "100%",
    height: "6%",
    valign: "middle",
    tags: true,
    style: {
      fg: "white",
    },
  });

  this.list.focus();

  this.screen.append(this.list);
  this.screen.append(this.logBox);
  this.screen.append(this.metadataBox);
  this.screen.append(this.metricsBox);
  this.screen.append(this.box4);

  this.list.setLabel(" Process List ");

  this.screen.render();

  this.screen.key(["escape", "q", "C-c"], function (ch, key) {
    this.screen.destroy();
    process.exit(0);
  });

  // async refresh of the ui
  // setInterval(function () {
  //   this.screen.render();
  // }, 300);
}

setup();
