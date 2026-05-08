module.exports = (errors) => {

  const formatter = (err) => err.msg;
    const formattedErrors = errors.formatWith(formatter).mapped();
    return formattedErrors;
}