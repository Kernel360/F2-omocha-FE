const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'color and backgroundColor should use rgba values',
    },
    schema: [],
    messages: {
      useRgba: 'Please use rgba for {{property}}.',
    },
  },
  create(context) {
    return {
      Property(node) {
        const propertyName = node.key.name || node.key.value;

        if (propertyName === 'color' || propertyName === 'backgroundColor') {
          const value = node.value.value;
          const isRgba = /^rgba?\(/.test(value);

          if (!isRgba) {
            context.report({
              node: node.value,
              messageId: 'useRgba',
              data: {
                property: propertyName,
              },
            });
          }
        }
      },
    };
  },
};

module.exports = rule;
