const validateBook = (
    title: string,
    description: string,
    author: string,
    isbn: number,
    publishedYear: number
): true | string => {
    const errors: string[] = [];

    const letterRegex = /[a-zA-Z]/;
    const digitRegex = /[0-9]/g;

    const specialCharRegex = /[^a-zA-Z0-9\s]/g;
    const currentYear = new Date().getFullYear();
    const startingYear = 1440;
    const validNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!title.trim()) {
        errors.push("Please enter Book title");
    } else if (title.length > 100) {
        errors.push("Book title is too long");
    } else if (!letterRegex.test(title)) {
        errors.push("Book title must be a valid name");
    } else {
        const digits = title.match(digitRegex);
        if (digits && digits.length > 5) {
            errors.push("Book title cannot contain more than 5 digits");
        }
        const specialChars = title.match(specialCharRegex);
        if (specialChars && specialChars.length > 5) {
            errors.push(
                "Book title cannot contain more than 3 special characters"
            );
        }
    }

    if (!isbn) {
        errors.push("Please enter an ISBN");
    } else if (!Number.isInteger(isbn)) {
        errors.push("ISBN must be an integer");
    } else {
        const isbnLength = isbn.toString().length;
        if (isbnLength !== 10 && isbnLength !== 13) {
            errors.push("ISBN must be a valid 10-digit or 13-digit number");
        }
    }
    if (!description.trim()) {
        errors.push("Please enter  Description");
    } else if (description.length > 500) {
        errors.push("Description is too long");
    } else if (!/[a-zA-Z]/.test(description)) {
        errors.push(
            "Description cannot contian only numbers or special characters"
        );
    }

    if (!author.trim()) {
        errors.push("Please enter Author");
    } else if (author.length > 50) {
        errors.push("Author is too long.");
    } else if (!validNameRegex.test(author)) {
        errors.push("Please enter valid a author name");
    }

    if (!publishedYear) {
        errors.push("Please enter published year");
    } else {
        if (publishedYear > currentYear) {
            errors.push(
                "Published year must be the current year or before the current year"
            );
        } else if (startingYear > publishedYear) {
            errors.push("Please Provide Published year after 1440");
        }
    }

   //  if (!image) {
   //      errors.push("Upload image");
   //  }

    return errors.length === 0 ? true : errors.join(", ");
};

export { validateBook };
