import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

export async function showWelcome() {
  const asciiTitle = figlet.textSync("BOOST CLI", {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  const message = gradient.pastel.multiline(asciiTitle);
  const box = boxen(message, {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
  });

  console.log(box);
}
